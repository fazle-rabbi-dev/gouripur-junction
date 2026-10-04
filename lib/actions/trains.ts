"use server"

import { revalidatePath, updateTag } from "next/cache"
import { cookies } from "next/headers"

import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  verifyAccessToken,
  verifyRefreshToken,
} from "@/lib/auth"
import { dbConnect } from "@/lib/db/connect"
import { logger } from "@/lib/logger"
import { TrainModel, type TrainDoc } from "@/lib/models/Train"

import type { TrainDTO, TrainInput } from "@/lib/types/train"

type Ok<T> = { ok: true; train?: T }
type Fail = { ok: false; error: string }
type Result<T = TrainDTO> = Ok<T> | Fail

// Only admin (valid access or refresh JWT cookie) may mutate trains.
async function requireAdmin(): Promise<boolean> {
  const jar = await cookies()
  const access = jar.get(ACCESS_COOKIE)?.value
  if (access) {
    try {
      await verifyAccessToken(access)
      return true
    } catch {
      // fall through to refresh token
    }
  }
  const refresh = jar.get(REFRESH_COOKIE)?.value
  if (!refresh) return false
  try {
    await verifyRefreshToken(refresh)
    return true
  } catch {
    return false
  }
}

function toDTO(d: TrainDoc): TrainDTO {
  return {
    _id: String(d._id),
    code: d.code,
    codeBn: d.codeBn,
    nameBn: d.nameBn,
    type: d.type,
    typeBn: d.typeBn,
    routeBn: d.routeBn,
    fromBn: d.fromBn,
    toBn: d.toBn,
    arrivalBn: d.arrivalBn,
    departureBn: d.departureBn,
    offDayBn: d.offDayBn,
    infoBn: d.infoBn,
    detailsBn: d.detailsBn ?? [],
    createdAt: d.createdAt?.toISOString() ?? "",
    updatedAt: d.updatedAt?.toISOString() ?? "",
  }
}

const REQUIRED: (keyof TrainInput)[] = [
  "code",
  "codeBn",
  "nameBn",
  "type",
  "typeBn",
  "routeBn",
  "fromBn",
  "toBn",
  "arrivalBn",
  "departureBn",
  "infoBn",
]

function validate(input: TrainInput): string | null {
  for (const key of REQUIRED) {
    const v = input[key]
    if (typeof v !== "string" || !v.trim()) return `Missing field: ${key}`
  }
  if (!["intercity", "local", "commuter"].includes(input.type)) {
    return "Invalid type"
  }
  if (!Array.isArray(input.detailsBn)) return "Invalid detailsBn"
  return null
}

function refreshTrainsCache() {
  updateTag("trains")
  // revalidatePath("/admin/dashboard", "page");
  // revalidatePath("/", "page");
  // revalidatePath("/trains", "page");
}

export async function addTrain(input: TrainInput): Promise<Result> {
  if (!(await requireAdmin())) return { ok: false, error: "Unauthorized" }
  const err = validate(input)
  if (err) return { ok: false, error: err }

  try {
    await dbConnect()
    const doc = await TrainModel.create(input)
    refreshTrainsCache()
    return { ok: true, train: toDTO(doc) }
  } catch (e) {
    logger.error("addTrain failed:", e)
    if (e instanceof Error && e.message.includes("E11000")) {
      return { ok: false, error: "এই কোডের ট্রেন আগেই আছে" }
    }
    return { ok: false, error: "ট্রেন যোগ করা যায়নি" }
  }
}

export async function updateTrain(
  code: string,
  patch: Partial<TrainInput>
): Promise<Result> {
  if (!(await requireAdmin())) return { ok: false, error: "Unauthorized" }
  if (!code?.trim()) return { ok: false, error: "Missing code" }

  // Code is the identity - never change it via patch.
  const { code: _drop, ...rest } = patch

  try {
    await dbConnect()
    const doc = await TrainModel.findOneAndUpdate(
      { code: code.trim() },
      { $set: rest },
      { new: true, runValidators: true }
    )
    if (!doc) return { ok: false, error: "ট্রেন পাওয়া যায়নি" }
    refreshTrainsCache()
    return { ok: true, train: toDTO(doc) }
  } catch (e) {
    logger.error("updateTrain failed:", e)
    return { ok: false, error: "ট্রেন আপডেট করা যায়নি" }
  }
}

export async function deleteTrain(code: string): Promise<Result> {
  if (!(await requireAdmin())) return { ok: false, error: "Unauthorized" }
  if (!code?.trim()) return { ok: false, error: "Missing code" }

  try {
    await dbConnect()
    const doc = await TrainModel.findOneAndDelete({ code: code.trim() })
    if (!doc) return { ok: false, error: "ট্রেন পাওয়া যায়নি" }
    refreshTrainsCache()
    return { ok: true }
  } catch (e) {
    logger.error("deleteTrain failed:", e)
    return { ok: false, error: "ট্রেন মোছা যায়নি" }
  }
}
