// Canonical Banner types. Single urgent banner (singleton by key).

// Fields stored in MongoDB (no _id, no timestamps).
export interface BannerInput {
  message: string; // urgent message (Bn)
  active: boolean; // on/off switch
  expiresAt: string; // ISO datetime - auto-hidden after this
}

// What get-banner / actions return (JSON-serializable, _id as string).
export interface BannerDTO extends BannerInput {
  _id: string;
  createdAt: string;
  updatedAt: string;
}
