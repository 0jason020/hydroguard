export interface TeamMember {
  name: string;
  role: string;
  district: string;
  province: string;
  lat: number;
  lng: number;
  focus: string;
  avatar: string;
  color: string;
}

// The team that built HydroGuard today — all based in Kigali
export const team: TeamMember[] = [
  {
    name: "Cyusa Jason",
    role: "Lead Software Engineer",
    district: "Kigali HQ",
    province: "Kigali",
    lat: -1.9536,
    lng: 30.0606,
    focus: "Architecture, data pipelines & live climate integration",
    avatar: "CJ",
    color: "oklch(0.78 0.15 200)",
  },
  {
    name: "Igihozo Noora Kantarama",
    role: "Product Marketer",
    district: "Kigali HQ",
    province: "Kigali",
    lat: -1.9606,
    lng: 30.0644,
    focus: "Go-to-market, partnerships & community outreach",
    avatar: "IN",
    color: "oklch(0.78 0.18 70)",
  },
  {
    name: "Akoguteta H.P. Merlyise",
    role: "UI/UX Designer",
    district: "Kigali HQ",
    province: "Kigali",
    lat: -1.9486,
    lng: 30.0928,
    focus: "Dashboard experience, data viz & design system",
    avatar: "AM",
    color: "oklch(0.72 0.18 155)",
  },
  {
    name: "Ineza Kundwa Lieny",
    role: "QA Engineer",
    district: "Kigali HQ",
    province: "Kigali",
    lat: -1.9441,
    lng: 30.0619,
    focus: "Test coverage, alert accuracy & release validation",
    avatar: "IK",
    color: "oklch(0.65 0.24 25)",
  },
  {
    name: "Ineza Mucyo Jean Luc",
    role: "Integration Engineer",
    district: "Kigali HQ",
    province: "Kigali",
    lat: -1.9701,
    lng: 30.1044,
    focus: "Open-Meteo, MINEMA & sensor integrations",
    avatar: "IM",
    color: "oklch(0.78 0.15 200)",
  },
];
