export interface VRHeadset {
  id: string;
  name: string;
  code: string;
  subtitle: string;
  price: number;
  rating: number;
  fov: string;
  display: string;
  refreshRate: string;
  weight: string;
  description: string;
  features: string[];
  accentColor: string;
  glowGradient: string;
}

export interface CartItem {
  headset: VRHeadset;
  quantity: number;
}
