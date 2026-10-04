import { TrainModel } from "@/lib/models/Train";
import { dbConnect } from "@/lib/db/connect";
import { TRAINS } from "@/lib/data/trains";
import { logger } from "@/lib/logger";

export const dynamic = "force-dynamic";

function devOnly() {
  if (process.env.NODE_ENV !== "development") {
    return Response.json({ error: "Not found" }, { status: 404 });
  }
  return null;
}

// POST /api/seed - upsert dummy trains into DB (dev only, idempotent by code).
export async function POST() {
  const blocked = devOnly();
  if (blocked) return blocked;

  try {
    await dbConnect();

    const ops = TRAINS.map((t) => ({
      updateOne: {
        filter: { code: t.code },
        update: { $set: t },
        upsert: true,
      },
    }));

    const result = await TrainModel.bulkWrite(ops);

    return Response.json({
      ok: true,
      matched: result.matchedCount,
      modified: result.modifiedCount,
      upserted: result.upsertedCount,
      total: TRAINS.length,
    });
  } catch (err) {
    logger.error("Seed failed:", err);
    return Response.json({ error: "Seed failed" }, { status: 500 });
  }
}

// GET /api/seed - usage hint (dev only).
export async function GET() {
  const blocked = devOnly();
  if (blocked) return blocked;

  return Response.json({
    usage: "POST /api/seed to seed dummy train data",
    count: TRAINS.length,
  });
}
