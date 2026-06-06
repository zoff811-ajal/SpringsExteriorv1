export interface Booking {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: 'Colorado Springs' | 'Monument' | 'Black Forest' | 'Broadmoor';
  date: string;
  services: string[];
  notes?: string;
  status: 'Pending Review' | 'Scheduled' | 'Completed';
  estimatedCost: number;
}

export interface RiskAssessment {
  treeDistance: 'close' | 'moderate' | 'safe'; // <30ft, 30-100ft, >100ft
  guttersCleaned: boolean;
  lowLimbsRemoved: boolean; // branches under 15ft
  dryBrushCleared: boolean; // within 30ft of house
  roofMaterial: 'combustible' | 'non-combustible'; // wood shake vs asphalt/metal
  wildfireriskScore?: number; // 0-100 scale
}

export interface ServiceDetail {
  name: string;
  shortDesc: string;
  longDesc: string;
  priceEstimate: string;
  icon: string; // Lucide icon name
  processStep: string;
}

export interface VideoConfig {
  url: string;
  opacity: number;
  blur: number;
  scale: number;
  speed: number;
  preset: string;
}
