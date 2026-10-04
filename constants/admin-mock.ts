import type { AdminPost, Banner, Train } from "@/@types/admin";

export const MOCK_TRAINS: Train[] = [
  { code: "৭৩৫", name: "বিজয় এক্সপ্রেস", type: "Intercity", route: "Gouripur ↔ Chattagram", arrival: "08:15", departure: "08:20", offDay: "বন্ধ নেই", description: "আন্তঃনগর — গৌরীপুর থেকে চট্টগ্রাম, ময়মনসিংহ হয়ে। চেয়ার ও এসি আছে।" },
  { code: "৭৪৪", name: "ব্রহ্মপুত্র এক্সপ্রেস", type: "Intercity", route: "Gouripur ↔ Mymensingh", arrival: "10:40", departure: "10:45", offDay: "বন্ধ নেই", description: "ঢাকা-ময়মনসিংহ করিডরের জনপ্রিয় আন্তঃনগর, গৌরীপুর হয়ে।" },
  { code: "৭৭৭", name: "হাওর এক্সপ্রেস", type: "Intercity", route: "Gouripur ↔ Mohonganj", arrival: "16:30", departure: "16:35", offDay: "বন্ধ নেই", description: "হাওর অঞ্চলের আন্তঃনগর — মোহনগঞ্জ। ছুটির দিনে ভিড় বেশি।" },
  { code: "২৬১", name: "জারিয়া লোকাল", type: "Local", route: "Gouripur ↔ Jaria", arrival: "06:10", departure: "06:15", description: "" },
  { code: "২৬২", name: "জারিয়া লোকাল (ফেরত)", type: "Local", route: "Gouripur ↔ Jaria", arrival: "11:20", departure: "11:25", description: "" },
  { code: "২৭১", name: "মোহনগঞ্জ লোকাল", type: "Local", route: "Gouripur ↔ Mohonganj", arrival: "07:45", departure: "07:50", description: "" },
  { code: "২৭২", name: "মোহনগঞ্জ লোকাল (ফেরত)", type: "Local", route: "Gouripur ↔ Mohonganj", arrival: "18:00", departure: "18:05", description: "" },
  { code: "২৮০", name: "ভৈরব লোকাল", type: "Local", route: "Gouripur ↔ Bhairab", arrival: "13:10", departure: "13:15", description: "" },
  { code: "২৮৪", name: "ভৈরব লোকাল (ফেরত)", type: "Local", route: "Gouripur ↔ Bhairab", arrival: "19:30", departure: "19:35", description: "" },
  { code: "৪৩", name: "মহুয়া কমিউটার", type: "Comuter", route: "Gouripur ↔ Mymensingh", arrival: "09:05", departure: "09:10", description: "" },
  { code: "৪৪", name: "বলাকা কমিউটার", type: "Comuter", route: "Gouripur ↔ Mymensingh", arrival: "17:15", departure: "17:20", description: "" },
];

export const MOCK_BANNER: Banner = {
  message: "হাওর এক্সপ্রেস ৪৫ মিনিট বিলম্বে — শ্যামগঞ্জের কাছে ট্রাক মেরামত।",
  expiry: "2026-10-05T14:25",
  active: true,
};

export const MOCK_POSTS: AdminPost[] = [
  { id: "p1", author: "Station Master", text: "Bijoy Express is running on time today. Platform 2.", status: "approved" },
  { id: "p2", author: "Rafiq", text: "Local train 261 left Gouripur 10 mins late — any update?", status: "pending" },
];

export const TRAIN_TYPES = ["Intercity", "Local", "Comuter"] as const;

export const ROUTES = [
  "Gouripur ↔ Mymensingh",
  "Gouripur ↔ Jaria",
  "Gouripur ↔ Mohonganj",
  "Gouripur ↔ Chattagram",
  "Gouripur ↔ Bhairab",
] as const;
