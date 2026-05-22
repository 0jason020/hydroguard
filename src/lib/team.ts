export interface TeamMember {
  name: string;
  role: string;
  district: string;
  province: string;
  lat: number;
  lng: number;
  focus: string;
  avatar: string; // initials fallback color
  color: string;
}

// Field & HQ team distributed across Rwanda
export const team: TeamMember[] = [
  {
    name: "Dr. Aline Mukamana",
    role: "Lead Hydrologist",
    district: "Kigali HQ",
    province: "Kigali",
    lat: -1.9536,
    lng: 30.0606,
    focus: "Flood modeling & river basin analytics",
    avatar: "AM",
    color: "oklch(0.78 0.15 200)",
  },
  {
    name: "Eric Nshimiyimana",
    role: "GIS & Remote Sensing Engineer",
    district: "Musanze",
    province: "Northern",
    lat: -1.4994,
    lng: 29.6346,
    focus: "Sentinel-2 NDVI & landslide terrain mapping",
    avatar: "EN",
    color: "oklch(0.72 0.18 155)",
  },
  {
    name: "Claudine Uwase",
    role: "Climate Data Scientist",
    district: "Rusizi",
    province: "Western",
    lat: -2.4847,
    lng: 28.9078,
    focus: "ML rainfall ensembles & anomaly detection",
    avatar: "CU",
    color: "oklch(0.78 0.18 70)",
  },
  {
    name: "Patrick Habimana",
    role: "Water Quality Specialist",
    district: "Rubavu",
    province: "Western",
    lat: -1.6792,
    lng: 29.2603,
    focus: "Lake Kivu turbidity & WQI monitoring",
    avatar: "PH",
    color: "oklch(0.78 0.15 200)",
  },
  {
    name: "Sandrine Ingabire",
    role: "Agro-Climatology Lead",
    district: "Huye",
    province: "Southern",
    lat: -2.5961,
    lng: 29.7406,
    focus: "Crop stress for coffee, tea, maize",
    avatar: "SI",
    color: "oklch(0.72 0.18 155)",
  },
  {
    name: "Jean-Bosco Niyonzima",
    role: "Disaster Response Coordinator",
    district: "Nyagatare",
    province: "Eastern",
    lat: -1.2972,
    lng: 30.3261,
    focus: "MINEMA liaison & rapid-response logistics",
    avatar: "JN",
    color: "oklch(0.65 0.24 25)",
  },
  {
    name: "Diane Mutoni",
    role: "AI/ML Engineer",
    district: "Kigali HQ",
    province: "Kigali",
    lat: -1.9706,
    lng: 30.0588,
    focus: "LSTM forecasting & model registry",
    avatar: "DM",
    color: "oklch(0.78 0.15 200)",
  },
  {
    name: "Olivier Rugamba",
    role: "Field Telemetry Engineer",
    district: "Nyabihu",
    province: "Western",
    lat: -1.6549,
    lng: 29.5126,
    focus: "Rain gauges & soil saturation sensors",
    avatar: "OR",
    color: "oklch(0.65 0.24 25)",
  },
];
