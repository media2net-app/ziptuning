export interface TuningData {
  original: { power: number; torque: number }
  tuned: { power: number; torque: number }
  gains: { power: number; torque: number; percentage: number }
  fuelSavings: number
  stage: string
  price: number
  duration: string
  warranty: string
  description: string
  features: string[]
  beforeAfter: {
    acceleration: { before: string; after: string }
    topspeed: { before: string; after: string }
    fuelConsumption: { before: string; after: string }
  }
}

export interface CarInfo {
  brand: string
  model: string
  generation: string
  engine: string
}

// Centralized tuning data - in real app this would come from API/database
export const tuningDatabase: Record<string, TuningData> = {
  // Audi A3 8Y
  'Audi A3 8Y 1.0 TFSI (110pk)': {
    original: { power: 110, torque: 200 },
    tuned: { power: 140, torque: 250 },
    gains: { power: 30, torque: 50, percentage: 27 },
    fuelSavings: 8,
    stage: 'Stage 1',
    price: 495,
    duration: '2-3 uur',
    warranty: '2 jaar',
    description: 'Optimale balans tussen prestaties en betrouwbaarheid. Ideaal voor dagelijks gebruik met merkbare verbetering in acceleratie en brandstofverbruik.',
    features: [
      'Verhoogd vermogen en koppel',
      'Verbeterde acceleratie',
      'Brandstofbesparing tot 8%',
      'Behoud van emissienormen',
      '2 jaar garantie',
      'Originele software backup'
    ],
    beforeAfter: {
      acceleration: { before: '10.2s', after: '9.1s' },
      topspeed: { before: '200 km/h', after: '215 km/h' },
      fuelConsumption: { before: '5.8L/100km', after: '5.3L/100km' }
    }
  },

  'Audi A3 8Y 1.5 TFSI (150pk)': {
    original: { power: 150, torque: 250 },
    tuned: { power: 190, torque: 320 },
    gains: { power: 40, torque: 70, percentage: 27 },
    fuelSavings: 7,
    stage: 'Stage 1',
    price: 525,
    duration: '2-3 uur',
    warranty: '2 jaar',
    description: 'Sportieve tuning voor de 1.5 TFSI motor met uitstekende prestaties en betrouwbaarheid. Perfect voor dagelijks gebruik en weekend plezier.',
    features: [
      'Significante vermogenswinst',
      'Verbeterde acceleratie',
      'Brandstofbesparing tot 7%',
      'Behoud van emissienormen',
      '2 jaar garantie',
      'Originele software backup'
    ],
    beforeAfter: {
      acceleration: { before: '8.9s', after: '7.8s' },
      topspeed: { before: '225 km/h', after: '240 km/h' },
      fuelConsumption: { before: '6.1L/100km', after: '5.7L/100km' }
    }
  },

  'Audi A3 8Y 2.0 TFSI (190pk)': {
    original: { power: 190, torque: 320 },
    tuned: { power: 240, torque: 400 },
    gains: { power: 50, torque: 80, percentage: 26 },
    fuelSavings: 6,
    stage: 'Stage 1',
    price: 575,
    duration: '2-3 uur',
    warranty: '2 jaar',
    description: 'Krachtige tuning voor de 2.0 TFSI motor. Uitstekende prestaties met behoud van comfort en betrouwbaarheid.',
    features: [
      'Krachtige vermogenswinst',
      'Dramatische acceleratie verbetering',
      'Brandstofbesparing tot 6%',
      'Behoud van emissienormen',
      '2 jaar garantie',
      'Originele software backup'
    ],
    beforeAfter: {
      acceleration: { before: '7.0s', after: '6.1s' },
      topspeed: { before: '250 km/h', after: '265 km/h' },
      fuelConsumption: { before: '6.8L/100km', after: '6.4L/100km' }
    }
  },

  // BMW 3 Serie G20
  'BMW 3 Serie G20 2.0i (184pk)': {
    original: { power: 184, torque: 300 },
    tuned: { power: 230, torque: 380 },
    gains: { power: 46, torque: 80, percentage: 25 },
    fuelSavings: 6,
    stage: 'Stage 1',
    price: 595,
    duration: '2-3 uur',
    warranty: '2 jaar',
    description: 'Sportieve tuning voor de BMW 3 Serie met behoud van comfort en betrouwbaarheid. Perfecte balans tussen prestaties en dagelijks gebruik.',
    features: [
      'Significante vermogenswinst',
      'Verbeterde acceleratie',
      'Brandstofbesparing tot 6%',
      'Behoud van emissienormen',
      '2 jaar garantie',
      'Originele software backup'
    ],
    beforeAfter: {
      acceleration: { before: '7.8s', after: '6.9s' },
      topspeed: { before: '235 km/h', after: '250 km/h' },
      fuelConsumption: { before: '6.2L/100km', after: '5.8L/100km' }
    }
  },

  'BMW 3 Serie G20 2.0d (190pk)': {
    original: { power: 190, torque: 400 },
    tuned: { power: 240, torque: 480 },
    gains: { power: 50, torque: 80, percentage: 26 },
    fuelSavings: 8,
    stage: 'Stage 1',
    price: 625,
    duration: '2-3 uur',
    warranty: '2 jaar',
    description: 'Diesel tuning voor de BMW 3 Serie met uitstekende brandstofbesparing en koppel. Ideaal voor lange ritten en dagelijks gebruik.',
    features: [
      'Krachtige vermogenswinst',
      'Uitstekend koppel',
      'Brandstofbesparing tot 8%',
      'Behoud van emissienormen',
      '2 jaar garantie',
      'Originele software backup'
    ],
    beforeAfter: {
      acceleration: { before: '7.4s', after: '6.5s' },
      topspeed: { before: '240 km/h', after: '255 km/h' },
      fuelConsumption: { before: '5.8L/100km', after: '5.3L/100km' }
    }
  },

  'BMW 3 Serie G20 3.0i (258pk)': {
    original: { power: 258, torque: 400 },
    tuned: { power: 320, torque: 500 },
    gains: { power: 62, torque: 100, percentage: 24 },
    fuelSavings: 5,
    stage: 'Stage 1',
    price: 695,
    duration: '3-4 uur',
    warranty: '2 jaar',
    description: 'High-performance tuning voor de 3.0i motor. Uitstekende prestaties met behoud van BMW comfort en betrouwbaarheid.',
    features: [
      'Hoge vermogenswinst',
      'Dramatische acceleratie verbetering',
      'Brandstofbesparing tot 5%',
      'Behoud van emissienormen',
      '2 jaar garantie',
      'Originele software backup'
    ],
    beforeAfter: {
      acceleration: { before: '6.2s', after: '5.4s' },
      topspeed: { before: '250 km/h', after: '270 km/h' },
      fuelConsumption: { before: '7.2L/100km', after: '6.8L/100km' }
    }
  },

  // Mercedes-Benz C-Klasse W205
  'Mercedes-Benz C-Klasse W205 2.0 (184pk)': {
    original: { power: 184, torque: 300 },
    tuned: { power: 230, torque: 380 },
    gains: { power: 46, torque: 80, percentage: 25 },
    fuelSavings: 6,
    stage: 'Stage 1',
    price: 625,
    duration: '2-3 uur',
    warranty: '2 jaar',
    description: 'Elegante tuning voor de Mercedes C-Klasse met behoud van comfort en luxe. Perfecte balans tussen prestaties en Mercedes kwaliteit.',
    features: [
      'Significante vermogenswinst',
      'Verbeterde acceleratie',
      'Brandstofbesparing tot 6%',
      'Behoud van emissienormen',
      '2 jaar garantie',
      'Originele software backup'
    ],
    beforeAfter: {
      acceleration: { before: '7.9s', after: '7.0s' },
      topspeed: { before: '235 km/h', after: '250 km/h' },
      fuelConsumption: { before: '6.3L/100km', after: '5.9L/100km' }
    }
  },

  // Volkswagen Golf Mk8
  'Volkswagen Golf Mk8 1.5 TSI (150pk)': {
    original: { power: 150, torque: 250 },
    tuned: { power: 190, torque: 320 },
    gains: { power: 40, torque: 70, percentage: 27 },
    fuelSavings: 7,
    stage: 'Stage 1',
    price: 475,
    duration: '2-3 uur',
    warranty: '2 jaar',
    description: 'Betrouwbare tuning voor de Volkswagen Golf met uitstekende prijs-kwaliteit verhouding. Perfect voor dagelijks gebruik.',
    features: [
      'Significante vermogenswinst',
      'Verbeterde acceleratie',
      'Brandstofbesparing tot 7%',
      'Behoud van emissienormen',
      '2 jaar garantie',
      'Originele software backup'
    ],
    beforeAfter: {
      acceleration: { before: '8.5s', after: '7.4s' },
      topspeed: { before: '220 km/h', after: '235 km/h' },
      fuelConsumption: { before: '5.9L/100km', after: '5.5L/100km' }
    }
  },

  // Porsche 911 992
  'Porsche 911 992 3.0 Carrera (385pk)': {
    original: { power: 385, torque: 450 },
    tuned: { power: 450, torque: 520 },
    gains: { power: 65, torque: 70, percentage: 17 },
    fuelSavings: 4,
    stage: 'Stage 1',
    price: 1295,
    duration: '4-5 uur',
    warranty: '2 jaar',
    description: 'Premium tuning voor de Porsche 911 met behoud van de legendarische Porsche prestaties en betrouwbaarheid.',
    features: [
      'Premium vermogenswinst',
      'Dramatische acceleratie verbetering',
      'Brandstofbesparing tot 4%',
      'Behoud van emissienormen',
      '2 jaar garantie',
      'Originele software backup'
    ],
    beforeAfter: {
      acceleration: { before: '4.2s', after: '3.8s' },
      topspeed: { before: '293 km/h', after: '305 km/h' },
      fuelConsumption: { before: '9.4L/100km', after: '9.0L/100km' }
    }
  }
}

// Helper function to get tuning data for a specific car
export function getTuningData(carInfo: CarInfo): TuningData | null {
  const key = `${carInfo.brand} ${carInfo.model} ${carInfo.generation.split(' ')[0]} ${carInfo.engine}`
  return tuningDatabase[key] || null
}

// Helper function to get all available cars
export function getAllAvailableCars(): CarInfo[] {
  return Object.keys(tuningDatabase).map(key => {
    const parts = key.split(' ')
    return {
      brand: parts[0],
      model: parts[1],
      generation: parts[2],
      engine: parts.slice(3).join(' ')
    }
  })
}
