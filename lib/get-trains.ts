import { dbConnect } from "@/lib/db/connect";
import { TrainModel } from "@/lib/models/Train";

import type { TrainDTO } from "@/lib/types/train";

// Server-only: uses mongoose directly. Call from Server Components or Route Handlers.
export async function getTrains(): Promise<TrainDTO[]> {
  await dbConnect();

  const docs = await TrainModel.find().sort({ code: 1 }).lean();

  return docs.map((d) => ({
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
  }));
}
