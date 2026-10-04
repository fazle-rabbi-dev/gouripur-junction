import { dbConnect } from "@/lib/db/connect";
import { BannerModel } from "@/lib/models/Banner";

import type { BannerDTO } from "@/lib/types/banner";

// Server-only: uses mongoose directly. Call from Server Components or Route Handlers.
// Returns null when no banner saved, switched off, or past expiry.
export async function getBanner(): Promise<BannerDTO | null> {
  await dbConnect();

  const d = await BannerModel.findOne({ key: "urgent" }).lean();
  if (!d || !d.active) return null;
  if (d.expiresAt && new Date(d.expiresAt).getTime() <= Date.now()) return null;

  return {
    _id: String(d._id),
    message: d.message,
    active: d.active,
    expiresAt: new Date(d.expiresAt).toISOString(),
    createdAt: d.createdAt?.toISOString() ?? "",
    updatedAt: d.updatedAt?.toISOString() ?? "",
  };
}
