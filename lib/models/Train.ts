import mongoose, { type Model, type SchemaDefinition } from "mongoose"

import type { TrainInput, TrainType } from "@/lib/types/train"

export interface TrainDoc extends TrainInput, mongoose.Document {
  createdAt: Date
  updatedAt: Date
}

const TRAIN_TYPES: TrainType[] = ["intercity", "local", "commuter"]

const trainDefinition: SchemaDefinition<TrainInput> = {
  code: { type: String, required: true, unique: true, trim: true },
  codeBn: { type: String, required: true, trim: true },
  nameBn: { type: String, required: true, trim: true },
  type: { type: String, required: true, enum: TRAIN_TYPES },
  typeBn: { type: String, required: true, trim: true },
  routeBn: { type: String, required: true, trim: true },
  fromBn: { type: String, required: true, trim: true },
  toBn: { type: String, required: true, trim: true },
  arrivalBn: { type: String, required: true, trim: true },
  departureBn: { type: String, required: true, trim: true },
  offDayBn: { type: String, required: true, default: "বন্ধ নেই", trim: true },
  infoBn: { type: String, required: true },
  detailsBn: { type: [String], required: true, default: [] },
}

const TrainSchema = new mongoose.Schema<TrainDoc>(trainDefinition, {
  timestamps: true,
  versionKey: false,
})

export const TrainModel: Model<TrainDoc> =
  mongoose.models.Train ?? mongoose.model<TrainDoc>("Train", TrainSchema)
