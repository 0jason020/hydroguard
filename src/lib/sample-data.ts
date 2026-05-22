export type RiskLevel = "high" | "moderate" | "low";

export interface District {
  name: string;
  province: string;
  lat: number;
  lng: number;
  floodRisk: RiskLevel;
  landslideRisk: RiskLevel;
  waterQuality: number; // 0-100
  rainfall: number; // mm last 7d
  population: number;
  riskScore: number; // 0-100
}

export const districts: District[] = [
  { name: "Nyabihu", province: "Western", lat: -1.6549, lng: 29.5126, floodRisk: "high", landslideRisk: "high", waterQuality: 58, rainfall: 142, population: 294740, riskScore: 87 },
  { name: "Rubavu", province: "Western", lat: -1.6792, lng: 29.2603, floodRisk: "high", landslideRisk: "moderate", waterQuality: 62, rainfall: 138, population: 403662, riskScore: 81 },
  { name: "Nyamasheke", province: "Western", lat: -2.3597, lng: 29.1397, floodRisk: "moderate", landslideRisk: "high", waterQuality: 71, rainfall: 121, population: 381804, riskScore: 76 },
  { name: "Rusizi", province: "Western", lat: -2.4847, lng: 28.9078, floodRisk: "high", landslideRisk: "high", waterQuality: 54, rainfall: 156, population: 400858, riskScore: 89 },
  { name: "Karongi", province: "Western", lat: -2.0667, lng: 29.3833, floodRisk: "moderate", landslideRisk: "high", waterQuality: 74, rainfall: 118, population: 331808, riskScore: 72 },
  { name: "Ngororero", province: "Western", lat: -1.8736, lng: 29.6175, floodRisk: "moderate", landslideRisk: "high", waterQuality: 66, rainfall: 124, population: 333713, riskScore: 75 },
  { name: "Rutsiro", province: "Western", lat: -1.9569, lng: 29.3344, floodRisk: "moderate", landslideRisk: "high", waterQuality: 69, rainfall: 130, population: 324654, riskScore: 73 },
  { name: "Musanze", province: "Northern", lat: -1.4994, lng: 29.6346, floodRisk: "moderate", landslideRisk: "high", waterQuality: 78, rainfall: 112, population: 368563, riskScore: 70 },
  { name: "Burera", province: "Northern", lat: -1.4789, lng: 29.8500, floodRisk: "moderate", landslideRisk: "high", waterQuality: 75, rainfall: 108, population: 336582, riskScore: 68 },
  { name: "Gicumbi", province: "Northern", lat: -1.5781, lng: 30.1097, floodRisk: "low", landslideRisk: "moderate", waterQuality: 82, rainfall: 92, population: 395606, riskScore: 48 },
  { name: "Gakenke", province: "Northern", lat: -1.7000, lng: 29.7833, floodRisk: "moderate", landslideRisk: "high", waterQuality: 72, rainfall: 119, population: 338234, riskScore: 71 },
  { name: "Rulindo", province: "Northern", lat: -1.7667, lng: 30.0833, floodRisk: "low", landslideRisk: "moderate", waterQuality: 81, rainfall: 88, population: 284486, riskScore: 46 },
  { name: "Nyarugenge", province: "Kigali", lat: -1.9706, lng: 30.0588, floodRisk: "moderate", landslideRisk: "low", waterQuality: 70, rainfall: 84, population: 374319, riskScore: 55 },
  { name: "Gasabo", province: "Kigali", lat: -1.9028, lng: 30.1217, floodRisk: "moderate", landslideRisk: "moderate", waterQuality: 68, rainfall: 89, population: 631385, riskScore: 62 },
  { name: "Kicukiro", province: "Kigali", lat: -1.9847, lng: 30.1372, floodRisk: "low", landslideRisk: "low", waterQuality: 76, rainfall: 81, population: 416766, riskScore: 38 },
  { name: "Kayonza", province: "Eastern", lat: -1.8839, lng: 30.6147, floodRisk: "low", landslideRisk: "low", waterQuality: 79, rainfall: 64, population: 421594, riskScore: 32 },
  { name: "Rwamagana", province: "Eastern", lat: -1.9486, lng: 30.4347, floodRisk: "low", landslideRisk: "low", waterQuality: 78, rainfall: 68, population: 393327, riskScore: 34 },
  { name: "Bugesera", province: "Eastern", lat: -2.2167, lng: 30.2833, floodRisk: "moderate", landslideRisk: "low", waterQuality: 65, rainfall: 72, population: 467589, riskScore: 52 },
  { name: "Ngoma", province: "Eastern", lat: -2.1500, lng: 30.5167, floodRisk: "low", landslideRisk: "low", waterQuality: 74, rainfall: 66, population: 387668, riskScore: 36 },
  { name: "Kirehe", province: "Eastern", lat: -2.2333, lng: 30.7833, floodRisk: "moderate", landslideRisk: "low", waterQuality: 70, rainfall: 78, population: 391239, riskScore: 49 },
  { name: "Nyagatare", province: "Eastern", lat: -1.2972, lng: 30.3261, floodRisk: "low", landslideRisk: "low", waterQuality: 77, rainfall: 58, population: 530965, riskScore: 31 },
  { name: "Gatsibo", province: "Eastern", lat: -1.5833, lng: 30.4333, floodRisk: "low", landslideRisk: "low", waterQuality: 76, rainfall: 62, population: 533321, riskScore: 33 },
  { name: "Huye", province: "Southern", lat: -2.5961, lng: 29.7406, floodRisk: "moderate", landslideRisk: "moderate", waterQuality: 72, rainfall: 104, population: 367260, riskScore: 60 },
  { name: "Nyanza", province: "Southern", lat: -2.3514, lng: 29.7508, floodRisk: "low", landslideRisk: "moderate", waterQuality: 75, rainfall: 96, population: 323653, riskScore: 51 },
  { name: "Gisagara", province: "Southern", lat: -2.6000, lng: 29.8167, floodRisk: "moderate", landslideRisk: "moderate", waterQuality: 68, rainfall: 102, population: 395423, riskScore: 58 },
  { name: "Nyaruguru", province: "Southern", lat: -2.6833, lng: 29.4500, floodRisk: "moderate", landslideRisk: "high", waterQuality: 70, rainfall: 116, population: 332190, riskScore: 67 },
  { name: "Nyamagabe", province: "Southern", lat: -2.4833, lng: 29.5500, floodRisk: "moderate", landslideRisk: "high", waterQuality: 71, rainfall: 122, population: 356697, riskScore: 69 },
  { name: "Ruhango", province: "Southern", lat: -2.2333, lng: 29.7833, floodRisk: "low", landslideRisk: "moderate", waterQuality: 74, rainfall: 88, population: 367152, riskScore: 47 },
  { name: "Muhanga", province: "Southern", lat: -2.0833, lng: 29.7500, floodRisk: "low", landslideRisk: "moderate", waterQuality: 76, rainfall: 91, population: 374620, riskScore: 49 },
  { name: "Kamonyi", province: "Southern", lat: -2.0333, lng: 29.9000, floodRisk: "low", landslideRisk: "low", waterQuality: 77, rainfall: 82, population: 380766, riskScore: 40 },
];

export const rainfallForecast = [
  { day: "Mon", actual: 24, predicted: 22, anomaly: 2 },
  { day: "Tue", actual: 38, predicted: 30, anomaly: 8 },
  { day: "Wed", actual: 52, predicted: 41, anomaly: 11 },
  { day: "Thu", actual: 46, predicted: 48, anomaly: -2 },
  { day: "Fri", actual: 64, predicted: 55, anomaly: 9 },
  { day: "Sat", actual: 71, predicted: 60, anomaly: 11 },
  { day: "Sun", actual: 58, predicted: 52, anomaly: 6 },
];

export const temperatureTrend = [
  { month: "Jan", temp: 20.1, avg: 19.8 },
  { month: "Feb", temp: 20.6, avg: 20.0 },
  { month: "Mar", temp: 21.2, avg: 20.4 },
  { month: "Apr", temp: 20.8, avg: 20.2 },
  { month: "May", temp: 20.4, avg: 19.9 },
  { month: "Jun", temp: 19.9, avg: 19.5 },
  { month: "Jul", temp: 20.2, avg: 19.6 },
  { month: "Aug", temp: 21.0, avg: 20.1 },
  { month: "Sep", temp: 21.4, avg: 20.5 },
  { month: "Oct", temp: 21.1, avg: 20.6 },
  { month: "Nov", temp: 20.7, avg: 20.3 },
  { month: "Dec", temp: 20.3, avg: 19.9 },
];

export const waterQualityTrend = [
  { week: "W1", pH: 7.1, turbidity: 12, oxygen: 8.4 },
  { week: "W2", pH: 7.0, turbidity: 18, oxygen: 8.1 },
  { week: "W3", pH: 6.8, turbidity: 24, oxygen: 7.6 },
  { week: "W4", pH: 6.9, turbidity: 31, oxygen: 7.2 },
  { week: "W5", pH: 6.7, turbidity: 28, oxygen: 7.4 },
  { week: "W6", pH: 7.0, turbidity: 22, oxygen: 7.8 },
];

export const hydropowerLevels = [
  { name: "Nyabarongo I", level: 78, capacity: 28 },
  { name: "Mukungwa", level: 64, capacity: 12 },
  { name: "Ntaruka", level: 71, capacity: 11 },
  { name: "Rusizi II", level: 82, capacity: 12 },
  { name: "Rukarara", level: 69, capacity: 9 },
];

export const agricultureStress = [
  { crop: "Maize", stress: 42, yield: 78 },
  { crop: "Beans", stress: 35, yield: 82 },
  { crop: "Tea", stress: 28, yield: 88 },
  { crop: "Coffee", stress: 51, yield: 71 },
  { crop: "Cassava", stress: 22, yield: 91 },
  { crop: "Banana", stress: 38, yield: 80 },
];

export interface AlertItem {
  id: string;
  type: "flood" | "landslide" | "pollution" | "weather";
  severity: "critical" | "warning" | "info";
  district: string;
  message: string;
  timeAgo: string;
}

export const alerts: AlertItem[] = [
  { id: "1", type: "flood", severity: "critical", district: "Rusizi", message: "Severe flood probability 87% in next 24h. Evacuation advised for low-lying areas.", timeAgo: "4 min ago" },
  { id: "2", type: "landslide", severity: "critical", district: "Nyabihu", message: "Soil saturation exceeded threshold. Slope failure likely within 12h.", timeAgo: "18 min ago" },
  { id: "3", type: "pollution", severity: "warning", district: "Rubavu", message: "Turbidity spike detected in Lake Kivu inflow. Source under investigation.", timeAgo: "42 min ago" },
  { id: "4", type: "weather", severity: "warning", district: "Musanze", message: "Heavy rainfall (>80mm) forecasted in next 48h.", timeAgo: "1h ago" },
  { id: "5", type: "flood", severity: "warning", district: "Nyamasheke", message: "River level rising. Monitor crossings and bridges.", timeAgo: "2h ago" },
  { id: "6", type: "pollution", severity: "info", district: "Huye", message: "Routine water sample collected. Results pending lab analysis.", timeAgo: "3h ago" },
];

export const aiInsights = [
  { title: "Western Province Cluster", confidence: 94, insight: "Anomalous rainfall pattern suggests El Niño influence intensifying. Expect 35% above-normal precipitation through next 3 weeks." },
  { title: "Landslide Convergence", confidence: 89, insight: "Convergent risk signals in Nyabihu, Rubavu, and Karongi. Recommend pre-positioning emergency response within 72h." },
  { title: "Water Quality Forecast", confidence: 91, insight: "Sediment runoff from agricultural zones will degrade downstream water quality by ~22% over next 10 days." },
  { title: "Crop Stress Detection", confidence: 86, insight: "Coffee plantations in Southern Province showing early drought stress signatures via NDVI satellite indices." },
];

export const sdgIndicators = [
  { goal: "SDG 6", name: "Clean Water & Sanitation", progress: 72 },
  { goal: "SDG 11", name: "Sustainable Communities", progress: 65 },
  { goal: "SDG 13", name: "Climate Action", progress: 78 },
  { goal: "SDG 15", name: "Life on Land", progress: 69 },
];
