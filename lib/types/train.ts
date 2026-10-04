// Canonical Train types. Import from here, not from mock data.
// lib/data/trains.ts re-exports these for backward compatibility.

export type TrainType = "intercity" | "local" | "commuter";

export type TrainTypeBn = "আন্তঃনগর" | "লোকাল" | "কমিউটার";

// Fields stored in MongoDB (no _id, no timestamps).
export interface TrainInput {
  code: string; // "735" - unique, used for search
  codeBn: string; // "৭৩৫" - for display
  nameBn: string; // "বিজয় এক্সপ্রেস"
  type: TrainType;
  typeBn: string; // display label, e.g. "আন্তঃনগর"
  routeBn: string; // "গৌরীপুর ↔ চট্টগ্রাম"
  fromBn: string;
  toBn: string;
  arrivalBn: string; // arrival at Gouripur
  departureBn: string; // departure from Gouripur
  offDayBn: string; // "বন্ধ নেই" | "বুধবার" | ...
  infoBn: string; // short description
  detailsBn: string[]; // bullet details for info page
}

// Alias kept so existing `import type { Train }` keeps working.
export type Train = TrainInput;

// What API routes return (JSON-serializable, _id as string).
export interface TrainDTO extends TrainInput {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

// Filter / sort / pagination helpers for future list APIs.
export interface TrainFilter {
  search?: string; // matches code, codeBn, nameBn, routeBn
  type?: TrainType;
}

export type TrainSortKey = "code" | "nameBn" | "departureBn" | "createdAt";

export interface TrainQueryOptions {
  filter?: TrainFilter;
  sort?: TrainSortKey;
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
}
