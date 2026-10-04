import mongoose, { type Model, type SchemaDefinition } from "mongoose"

interface BannerFields {
  key: string // singleton key - always "urgent"
  message: string
  active: boolean
  expiresAt: Date
}

export interface BannerDoc extends BannerFields, mongoose.Document {
  createdAt: Date
  updatedAt: Date
}

const bannerDefinition: SchemaDefinition<BannerFields> = {
  key: { type: String, required: true, unique: true, default: "urgent", trim: true },
  message: { type: String, required: true, trim: true },
  active: { type: Boolean, required: true, default: false },
  expiresAt: { type: Date, required: true },
}

const BannerSchema = new mongoose.Schema<BannerDoc>(bannerDefinition, {
  timestamps: true,
  versionKey: false,
})

export const BannerModel: Model<BannerDoc> =
  mongoose.models.Banner ?? mongoose.model<BannerDoc>("Banner", BannerSchema)
