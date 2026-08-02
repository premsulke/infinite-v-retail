import { VRHeadset } from '../types';

export const VR_HEADSETS: VRHeadset[] = [
  {
    id: 'model-1',
    name: 'INFINITE V-X1 APEX',
    code: 'V.RETAIL-01',
    subtitle: 'Limitless Immersion & Neural Audio',
    price: 999,
    rating: 4.9,
    fov: '140° Ultrawide',
    display: '8K Micro-OLED (4K per eye)',
    refreshRate: '120 Hz Variable',
    weight: '340g Carbon Fibre',
    description: 'The flagship VR headset engineered for absolute realism. Features biometric haptics, quantum optic lenses, and dynamic ray-traced spatial audio.',
    features: [
      'Dual 8K Micro-OLED Displays',
      'Integrated Neural Haptic Straps',
      'LiDAR Room Mapping 2.0',
      'Ultra-low 2ms Latency Passthrough'
    ],
    accentColor: '#FF5B00',
    glowGradient: 'from-orange-600 via-amber-500 to-red-600'
  },
  {
    id: 'model-2',
    name: 'INFINITE V-X2 QUANTUM',
    code: 'V.RETAIL-02',
    subtitle: 'Cybernetic Visuals & Neon Core',
    price: 1249,
    rating: 4.95,
    fov: '150° Panoramic',
    display: 'Dual Mini-LED Quantum Dot',
    refreshRate: '144 Hz Ultra',
    weight: '315g Aero Alloy',
    description: 'Designed for elite competitive virtual dimensions. Boasts front-lit neon sensor array, active liquid cooling, and sub-millimeter motion tracking.',
    features: [
      'High Contrast Quantum-Dot Optics',
      'Active Liquid-Cooling Architecture',
      'Integrated Dual Pass-Through Cameras',
      'Customized RGB Light Grid Visor'
    ],
    accentColor: '#00F0FF',
    glowGradient: 'from-cyan-500 via-blue-600 to-orange-500'
  },
  {
    id: 'model-3',
    name: 'INFINITE V-X3 PRISM',
    code: 'V.RETAIL-03',
    subtitle: 'Cyberpunk Visor & Ultra-light Frame',
    price: 1499,
    rating: 5.0,
    fov: '160° Cinematic',
    display: 'Continuous Curved OLED Visor',
    refreshRate: '165 Hz Pro',
    weight: '290g Ultralight',
    description: 'The pinnacle of futuristic retail VR technology. Seamless edge-to-edge prism visor with eye-gaze intent controls and direct brainwave sync.',
    features: [
      'Continuous Curved Horizon Visor',
      'Sub-degree Eye Tracking Sensor',
      'Zero-Latency Wireless Stream Box',
      'Ergonomic Zero-Gravity Suspension'
    ],
    accentColor: '#FF007A',
    glowGradient: 'from-pink-500 via-purple-600 to-cyan-400'
  }
];
