"use client"

import { useState } from "react";
import { Info, LayoutGrid, Megaphone, MessagesSquare } from "lucide-react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { addTrain, deleteTrain, updateTrain } from "@/lib/actions/trains";
import { saveBanner } from "@/lib/actions/banner";
import { useAdminData } from "@/hooks/use-admin-data";
import type { BannerDTO, BannerInput } from "@/lib/types/banner";
import type { TrainDTO, TrainInput } from "@/lib/types/train";
import { AdminHeader } from "./admin-header"
import { AdminStats } from "./admin-stats"
import { BannerForm } from "./banner-form"
import { DeleteTrainDialog } from "./delete-train-dialog"
import { ModerationQueue } from "./moderation-queue"
import { TrainDialog } from "./train-dialog"
import { TrainInfoForm } from "./train-info-form"
import { TrainsTable } from "./trains-table"

// Form carries DB meta fields - strip them before sending to actions.
function toInput(t: TrainDTO): TrainInput {
  return {
    code: t.code,
    codeBn: t.codeBn,
    nameBn: t.nameBn,
    type: t.type,
    typeBn: t.typeBn,
    routeBn: t.routeBn,
    fromBn: t.fromBn,
    toBn: t.toBn,
    arrivalBn: t.arrivalBn,
    departureBn: t.departureBn,
    offDayBn: t.offDayBn,
    infoBn: t.infoBn,
    detailsBn: t.detailsBn ?? [],
  };
}

export function Dashboard({
  initialTrains,
  initialBanner,
}: {
  initialTrains: TrainDTO[];
  initialBanner: BannerDTO | null;
}) {
  // Posts still come from local mock hook; trains + banner come from DB.
  const { posts, setPosts } = useAdminData();
  const [trains, setTrains] = useState<TrainDTO[]>(initialTrains);
  const [banner, setBanner] = useState<BannerDTO>(
    initialBanner ?? {
      _id: "",
      message: "",
      active: false,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      createdAt: "",
      updatedAt: "",
    }
  );
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<TrainDTO | null>(null)
  const [deleting, setDeleting] = useState<TrainDTO | null>(null)
  const [busy, setBusy] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)

  const pending = posts.filter((p) => p.status === "pending").length
  const approved = posts.filter((p) => p.status === "approved").length

  async function handleSave(t: TrainDTO, isNew: boolean) {
    setBusy(true)
    setActionError(null)
    const res = isNew
      ? await addTrain(toInput(t))
      : await updateTrain(t.code, toInput(t))
    setBusy(false)
    if (!res.ok) {
      setActionError(res.error)
      return
    }
    if (res.train) {
      setTrains((prev) =>
        isNew
          ? [...prev, res.train!]
          : prev.map((x) => (x.code === res.train!.code ? res.train! : x))
      )
    }
    setDialogOpen(false)
    setEditing(null)
  }

  async function handleDeleteConfirm() {
    if (!deleting) return
    setBusy(true)
    setActionError(null)
    const res = await deleteTrain(deleting.code)
    setBusy(false)
    if (!res.ok) {
      setActionError(res.error)
      return
    }
    setTrains((prev) => prev.filter((t) => t.code !== deleting.code))
    setDeleting(null)
  }

  async function handleBannerSave(input: BannerInput) {
    setBusy(true)
    setActionError(null)
    const res = await saveBanner(input)
    setBusy(false)
    if (!res.ok) {
      setActionError(res.error)
      return false
    }
    setBanner(res.banner)
    return true
  }

  async function handleInfoSave(code: string, detailsBn: string[]) {
    setActionError(null)
    const res = await updateTrain(code, { detailsBn })
    if (!res.ok) {
      setActionError(res.error)
      return false
    }
    if (res.train) {
      setTrains((prev) =>
        prev.map((t) => (t.code === code ? res.train! : t))
      )
    }
    return true
  }

  return (
    <div className="grid min-w-0 gap-4">
      <AdminHeader />
      <AdminStats
        totalTrains={trains.length}
        pending={pending}
        approved={approved}
        bannerActive={banner.active}
      />

      {actionError && (
        <p
          role="alert"
          className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive"
        >
          {actionError}
          <button
            type="button"
            onClick={() => setActionError(null)}
            className="ml-2 underline"
          >
            বন্ধ করুন
          </button>
        </p>
      )}

      <Tabs defaultValue="trains" className="w-full min-w-0">
        <TabsList
          variant="line"
          className="mb-4 w-full max-w-full justify-start overflow-x-auto"
        >
          <TabsTrigger value="banner" className="shrink-0">
            <Megaphone /> জরুরি ব্যানার
          </TabsTrigger>
          <TabsTrigger value="trains" className="shrink-0">
            <LayoutGrid /> ট্রেন ও সময়সূচি
          </TabsTrigger>
          <TabsTrigger value="posts" className="shrink-0">
            <MessagesSquare /> পোস্ট যাচাই ({pending})
          </TabsTrigger>
          <TabsTrigger value="info" className="shrink-0">
            <Info /> ট্রেনের তথ্য
          </TabsTrigger>
        </TabsList>

        <TabsContent value="banner" className="min-w-0">
          <BannerForm banner={banner} saving={busy} onSave={handleBannerSave} />
        </TabsContent>

        <TabsContent value="trains" className="min-w-0">
          <TrainsTable
            trains={trains}
            onAdd={() => {
              setEditing(null)
              setDialogOpen(true)
            }}
            onEdit={(t) => {
              setEditing(t)
              setDialogOpen(true)
            }}
            onDelete={setDeleting}
          />
        </TabsContent>

        <TabsContent value="posts" className="min-w-0">
          <ModerationQueue
            posts={posts}
            onApprove={(id) =>
              setPosts(
                posts.map((p) =>
                  p.id === id ? { ...p, status: "approved" as const } : p
                )
              )
            }
            onReject={(id) => setPosts(posts.filter((p) => p.id !== id))}
            onDelete={(id) => setPosts(posts.filter((p) => p.id !== id))}
          />
        </TabsContent>

        <TabsContent value="info" className="min-w-0">
          <TrainInfoForm trains={trains} onSave={handleInfoSave} />
        </TabsContent>
      </Tabs>

      <TrainDialog
        open={dialogOpen}
        editing={editing}
        saving={busy}
        onClose={() => {
          setDialogOpen(false)
          setEditing(null)
        }}
        onSave={handleSave}
      />

      <DeleteTrainDialog
        train={deleting}
        saving={busy}
        onClose={() => setDeleting(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
