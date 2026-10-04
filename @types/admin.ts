export type TrainType = "Intercity" | "Local" | "Comuter";

export interface Train {
  code: string;
  name: string;
  type: TrainType;
  route: string;
  arrival: string;
  departure: string;
  offDay?: string;
  description?: string;
}

export interface Banner {
  message: string;
  expiry: string;
  active: boolean;
}

export type PostStatus = "pending" | "approved";

export interface AdminPost {
  id: string;
  author: string;
  text: string;
  status: PostStatus;
}
