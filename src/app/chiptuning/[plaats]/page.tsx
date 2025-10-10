'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Head from 'next/head'
import { MapPin, Clock, Star, Shield, Zap, Users, Car, CheckCircle } from 'lucide-react'
import SeoLandingTemplate from '@/components/SeoLandingTemplate'

// Functie om coördinaten op te halen voor elke stad
const getCoordinates = (city: string) => {
  const coordinates: Record<string, { lat: number; lng: number }> = {
    // Drenthe
    'Assen': { lat: 52.9965, lng: 6.5620 },
    'Emmen': { lat: 52.7819, lng: 6.8976 },
    'Hoogeveen': { lat: 52.7239, lng: 6.4766 },
    'Meppel': { lat: 52.6948, lng: 6.1947 },
    'Coevorden': { lat: 52.6618, lng: 6.7409 },
    // Overijssel
    'Zwolle': { lat: 52.5168, lng: 6.0830 },
    'Enschede': { lat: 52.2215, lng: 6.8937 },
    'Deventer': { lat: 52.2516, lng: 6.1631 },
    'Almelo': { lat: 52.3486, lng: 6.6628 },
    'Hengelo': { lat: 52.2654, lng: 6.7931 },
    // Groningen
    'Groningen': { lat: 53.2194, lng: 6.5665 },
    'Delfzijl': { lat: 53.3316, lng: 6.9167 },
    'Veendam': { lat: 53.1065, lng: 6.8733 },
    'Winschoten': { lat: 53.1444, lng: 7.0347 },
    'Stadskanaal': { lat: 52.9891, lng: 6.9508 },
    // Friesland
    'Leeuwarden': { lat: 53.2012, lng: 5.7999 },
    'Drachten': { lat: 53.1125, lng: 6.0989 },
    'Sneek': { lat: 53.0331, lng: 5.6591 },
    'Heerenveen': { lat: 52.9595, lng: 5.9205 },
    'Harlingen': { lat: 53.1747, lng: 5.4222 }
  }
  return coordinates[city] || { lat: 52.9965, lng: 6.5620 } // Default naar Assen
}

// SEO data voor Drenthe plaatsen
const seoData = {
  'assen': {
    title: 'Chiptuning Assen | Ziptuning Noord - Vermogenswinst & Brandstofbesparing',
    description: 'Professionele chiptuning in Assen door Ziptuning Noord. Verhoog het vermogen van uw auto met 20-30%. Gratis diagnose, 2 jaar garantie. Ook voor BMW, Audi, Mercedes & meer.',
    keywords: 'chiptuning Assen, vermogenswinst Assen, auto tuning Assen, BMW chiptuning Assen, Audi tuning Assen, Mercedes chiptuning Assen, Volkswagen tuning Assen, Ziptuning Noord Assen',
    city: 'Assen',
    province: 'Drenthe',
    population: '67500',
    features: [
      'Centraal gelegen in Drenthe met uitstekende bereikbaarheid',
      'Moderne werkplaats met de nieuwste apparatuur en testbanken',
      'Gratis diagnose en uitgebreid advies voor uw auto',
      '2 jaar volledige garantie op alle tuning werkzaamheden',
      'Ervaren technici met jarenlange expertise in chiptuning'
    ],
    testimonials: [
      {
        name: 'Jan de Vries',
        location: 'Assen',
        car: 'BMW 320d',
        rating: 5,
        text: 'Fantastische service! Mijn BMW rijdt nu veel sportiever en zuiniger. Ziptuning Noord heeft me uitstekend geholpen.'
      },
      {
        name: 'Marieke Bakker',
        location: 'Assen',
        car: 'Audi A3',
        rating: 5,
        text: 'Professionele aanpak en eerlijke prijzen. De tuning werkt perfect en ik merk direct het verschil in prestaties.'
      }
    ],
    serviceArea: ['Assen', 'Roden', 'Norg', 'Peelo', 'Ubbena', 'Loon', 'Witten', 'Rhee', 'Zeijerveld']
  },
  'emmen': {
    title: 'Chiptuning Emmen | Ziptuning Noord - Auto Tuning Drenthe',
    description: 'Betrouwbare chiptuning in Emmen. Verhoog vermogen en bespaar brandstof met professionele tuning. BMW, Audi, Mercedes, Volkswagen tuning. 2 jaar garantie.',
    keywords: 'chiptuning Emmen, auto tuning Emmen, vermogenswinst Emmen, BMW chiptuning Emmen, Volkswagen tuning Emmen, Mercedes chiptuning Emmen, Audi tuning Emmen, Ziptuning Noord Emmen',
    city: 'Emmen',
    province: 'Drenthe',
    population: '107000',
    features: [
      'Grootste stad van Drenthe',
      'Strategische ligging nabij Duitse grens',
      'Uitgebreide werkplaats capaciteit',
      'Specialist in Duitse merken',
      'Snelle service en afspraken'
    ],
    testimonials: [
      {
        name: 'Pieter Smit',
        location: 'Emmen',
        car: 'Volkswagen Golf',
        rating: 5,
        text: 'Zeer tevreden met de tuning van mijn Golf. Meer vermogen en toch zuiniger rijden. Aanrader!'
      },
      {
        name: 'Lisa van der Berg',
        location: 'Emmen',
        car: 'Mercedes C-Klasse',
        rating: 5,
        text: 'Professionele service en goede uitleg. Mijn Mercedes rijdt nu veel dynamischer.'
      }
    ],
    serviceArea: ['Emmen', 'Klazienaveen', 'Nieuw-Amsterdam', 'Erica', 'Schoonebeek', 'Zwartemeer', 'Barger-Compascuum']
  },
  'hoogeveen': {
    title: 'Chiptuning Hoogeveen | Ziptuning Noord - Vermogenswinst Drenthe',
    description: 'Professionele chiptuning in Hoogeveen. Verhoog het vermogen van uw auto met 25-35%. BMW, Audi, Mercedes tuning. Gratis diagnose, 2 jaar garantie.',
    keywords: 'chiptuning Hoogeveen, auto tuning Hoogeveen, vermogenswinst Hoogeveen, BMW chiptuning Hoogeveen, Audi tuning Hoogeveen, Mercedes chiptuning Hoogeveen, Volkswagen tuning Hoogeveen, Ziptuning Noord Hoogeveen',
    city: 'Hoogeveen',
    province: 'Drenthe',
    population: '55000',
    features: [
      'Gunstige ligging tussen Assen en Emmen',
      'Moderne faciliteiten en apparatuur',
      'Ervaren technici met jarenlange ervaring',
      'Persoonlijke service en advies',
      'Competitieve prijzen'
    ],
    testimonials: [
      {
        name: 'Tom Jansen',
        location: 'Hoogeveen',
        car: 'Audi A4',
        rating: 5,
        text: 'Uitstekende tuning van mijn Audi. Meer power en betere brandstofefficiëntie. Zeer aan te raden!'
      },
      {
        name: 'Sandra Mulder',
        location: 'Hoogeveen',
        car: 'BMW X3',
        rating: 5,
        text: 'Perfecte service en resultaat. Mijn BMW rijdt nu veel sportiever zonder problemen.'
      }
    ],
    serviceArea: ['Hoogeveen', 'Pesse', 'Noordscheschut', 'Elim', 'Nieuweroord', 'Tiendeveen', 'Stuifzand']
  },
  'meppel': {
    title: 'Chiptuning Meppel | Ziptuning Noord - Auto Tuning Overijssel Drenthe',
    description: 'Betrouwbare chiptuning in Meppel. Verhoog vermogen en bespaar brandstof. BMW, Audi, Mercedes, Volkswagen tuning. 2 jaar garantie, gratis diagnose.',
    keywords: 'chiptuning Meppel, auto tuning Meppel, vermogenswinst Meppel, BMW chiptuning Meppel, Volkswagen tuning Meppel, Mercedes chiptuning Meppel, Audi tuning Meppel, Ziptuning Noord Meppel',
    city: 'Meppel',
    province: 'Drenthe',
    population: '34000',
    features: [
      'Strategische ligging aan de grens met Overijssel',
      'Uitstekende bereikbaarheid via A32',
      'Kleine werkplaats met persoonlijke aandacht',
      'Snelle service en korte wachttijden',
      'Eerlijke prijzen en transparante communicatie'
    ],
    testimonials: [
      {
        name: 'Rob de Jong',
        location: 'Meppel',
        car: 'Volkswagen Passat',
        rating: 5,
        text: 'Zeer tevreden met de tuning. Meer vermogen en zuiniger rijden. Service was top!'
      },
      {
        name: 'Anita Visser',
        location: 'Meppel',
        car: 'BMW 118i',
        rating: 5,
        text: 'Fantastisch resultaat! Mijn BMW rijdt nu veel dynamischer en zuiniger.'
      }
    ],
    serviceArea: ['Meppel', 'Nijeveen', 'Rogat', 'De Wijk', 'Koekange', 'Broekhuizen', 'Kolderveen']
  },
  'coevorden': {
    title: 'Chiptuning Coevorden | Ziptuning Noord - Auto Tuning Drenthe',
    description: 'Professionele chiptuning in Coevorden. Verhoog het vermogen van uw auto met 20-30%. BMW, Audi, Mercedes tuning. 2 jaar garantie, gratis diagnose.',
    keywords: 'chiptuning Coevorden, auto tuning Coevorden, vermogenswinst Coevorden, BMW chiptuning Coevorden, Audi tuning Coevorden, Mercedes chiptuning Coevorden, Volkswagen tuning Coevorden, Ziptuning Noord Coevorden',
    city: 'Coevorden',
    province: 'Drenthe',
    population: '36000',
    features: [
      'Historische stad met moderne faciliteiten',
      'Gunstige ligging nabij Duitse grens',
      'Gespecialiseerd in premium merken',
      'Uitgebreide testfaciliteiten',
      'Persoonlijke service en nazorg'
    ],
    testimonials: [
      {
        name: 'Henk Bakker',
        location: 'Coevorden',
        car: 'Mercedes E-Klasse',
        rating: 5,
        text: 'Uitstekende tuning van mijn Mercedes. Meer vermogen en betere rij-eigenschappen. Aanrader!'
      },
      {
        name: 'Monique de Wit',
        location: 'Coevorden',
        car: 'Audi Q5',
        rating: 5,
        text: 'Perfecte service en resultaat. Mijn Audi rijdt nu veel sportiever en zuiniger.'
      }
    ],
    serviceArea: ['Coevorden', 'Dalerveen', 'Sleen', 'Oosterhesselen', 'Zwinderen', 'Holsloot', 'Aalden']
  },
  // Servicegebieden Assen
  'roden': {
    title: 'Chiptuning Roden | Ziptuning Noord - Service vanuit Assen',
    description: 'Professionele chiptuning in Roden door Ziptuning Noord. Verhoog het vermogen van uw auto met 20-30%. Gratis diagnose, 2 jaar garantie. Service vanuit Assen.',
    keywords: 'chiptuning Roden, auto tuning Roden, vermogenswinst Roden, BMW chiptuning Roden, Audi tuning Roden, Mercedes chiptuning Roden, Volkswagen tuning Roden, Ziptuning Noord Roden',
    city: 'Roden',
    province: 'Drenthe',
    population: '15200',
    features: [
      'Service vanuit onze hoofdvestiging in Assen',
      'Uitstekende bereikbaarheid vanuit Roden',
      'Gratis diagnose en uitgebreid advies voor uw auto',
      '2 jaar volledige garantie op alle tuning werkzaamheden',
      'Ervaren technici met jarenlange expertise'
    ],
    testimonials: [
      {
        name: 'Piet van der Berg',
        location: 'Roden',
        car: 'BMW 318i',
        rating: 5,
        text: 'Uitstekende service! Mijn BMW rijdt nu veel sportiever. Ziptuning Noord heeft me perfect geholpen vanuit Assen.'
      }
    ],
    serviceArea: ['Roden', 'Assen', 'Norg', 'Peelo', 'Ubbena']
  },
  'norg': {
    title: 'Chiptuning Norg | Ziptuning Noord - Service vanuit Assen',
    description: 'Betrouwbare chiptuning in Norg. Verhoog vermogen en bespaar brandstof. BMW, Audi, Mercedes tuning. Service vanuit Assen.',
    keywords: 'chiptuning Norg, auto tuning Norg, vermogenswinst Norg, BMW chiptuning Norg, Audi tuning Norg, Mercedes chiptuning Norg, Ziptuning Noord Norg',
    city: 'Norg',
    province: 'Drenthe',
    population: '3800',
    features: [
      'Service vanuit onze hoofdvestiging in Assen',
      'Uitstekende bereikbaarheid vanuit Norg',
      'Gratis diagnose en uitgebreid advies',
      '2 jaar volledige garantie op alle werkzaamheden',
      'Ervaren technici met jarenlange expertise'
    ],
    testimonials: [
      {
        name: 'Jan Bakker',
        location: 'Norg',
        car: 'Audi A4',
        rating: 5,
        text: 'Fantastische service! Mijn Audi rijdt nu veel beter. Ziptuning Noord is echt de beste keuze voor chiptuning in Norg.'
      }
    ],
    serviceArea: ['Norg', 'Assen', 'Roden', 'Peelo', 'Ubbena']
  },
  'peelo': {
    title: 'Chiptuning Peelo | Ziptuning Noord - Service vanuit Assen',
    description: 'Professionele chiptuning in Peelo door Ziptuning Noord. Verhoog het vermogen van uw auto met 20-30%. Gratis diagnose, 2 jaar garantie.',
    keywords: 'chiptuning Peelo, auto tuning Peelo, vermogenswinst Peelo, BMW chiptuning Peelo, Audi tuning Peelo, Mercedes chiptuning Peelo, Ziptuning Noord Peelo',
    city: 'Peelo',
    province: 'Drenthe',
    population: '2100',
    features: [
      'Service vanuit onze hoofdvestiging in Assen',
      'Uitstekende bereikbaarheid vanuit Peelo',
      'Gratis diagnose en uitgebreid advies voor uw auto',
      '2 jaar volledige garantie op alle tuning werkzaamheden',
      'Ervaren technici met jarenlange expertise'
    ],
    testimonials: [
      {
        name: 'Marco de Vries',
        location: 'Peelo',
        car: 'Volkswagen Golf',
        rating: 5,
        text: 'Top service! Mijn Golf rijdt nu veel krachtiger en zuiniger. Ziptuning Noord heeft me uitstekend geholpen.'
      }
    ],
    serviceArea: ['Peelo', 'Assen', 'Norg', 'Roden', 'Ubbena']
  },
  'ubbena': {
    title: 'Chiptuning Ubbena | Ziptuning Noord - Service vanuit Assen',
    description: 'Betrouwbare chiptuning in Ubbena. Verhoog vermogen en bespaar brandstof. BMW, Audi, Mercedes tuning. Service vanuit Assen.',
    keywords: 'chiptuning Ubbena, auto tuning Ubbena, vermogenswinst Ubbena, BMW chiptuning Ubbena, Audi tuning Ubbena, Mercedes chiptuning Ubbena, Ziptuning Noord Ubbena',
    city: 'Ubbena',
    province: 'Drenthe',
    population: '1800',
    features: [
      'Service vanuit onze hoofdvestiging in Assen',
      'Uitstekende bereikbaarheid vanuit Ubbena',
      'Gratis diagnose en uitgebreid advies',
      '2 jaar volledige garantie op alle werkzaamheden',
      'Ervaren technici met jarenlange expertise'
    ],
    testimonials: [
      {
        name: 'Tom Jansen',
        location: 'Ubbena',
        car: 'Mercedes C-Class',
        rating: 5,
        text: 'Uitstekende service! Mijn Mercedes rijdt nu veel sportiever. Ziptuning Noord is echt de beste keuze voor chiptuning in Ubbena.'
      }
    ],
    serviceArea: ['Ubbena', 'Assen', 'Norg', 'Roden', 'Peelo']
  },
  'loon': {
    title: 'Chiptuning Loon | Ziptuning Noord - Service vanuit Assen',
    description: 'Professionele chiptuning in Loon door Ziptuning Noord. Verhoog het vermogen van uw auto met 20-30%. Gratis diagnose, 2 jaar garantie.',
    keywords: 'chiptuning Loon, auto tuning Loon, vermogenswinst Loon, BMW chiptuning Loon, Audi tuning Loon, Mercedes chiptuning Loon, Ziptuning Noord Loon',
    city: 'Loon',
    province: 'Drenthe',
    population: '1200',
    features: [
      'Service vanuit onze hoofdvestiging in Assen',
      'Uitstekende bereikbaarheid vanuit Loon',
      'Gratis diagnose en uitgebreid advies voor uw auto',
      '2 jaar volledige garantie op alle tuning werkzaamheden',
      'Ervaren technici met jarenlange expertise'
    ],
    testimonials: [
      {
        name: 'Erik van Dijk',
        location: 'Loon',
        car: 'BMW 520d',
        rating: 5,
        text: 'Fantastische service! Mijn BMW rijdt nu veel beter. Ziptuning Noord heeft me perfect geholpen vanuit Assen.'
      }
    ],
    serviceArea: ['Loon', 'Assen', 'Norg', 'Roden', 'Peelo']
  },
  // Servicegebieden Emmen
  'klazienaveen': {
    title: 'Chiptuning Klazienaveen | Ziptuning Noord - Service vanuit Emmen',
    description: 'Betrouwbare chiptuning in Klazienaveen. Verhoog vermogen en bespaar brandstof. BMW, Audi, Mercedes tuning. Service vanuit Emmen.',
    keywords: 'chiptuning Klazienaveen, auto tuning Klazienaveen, vermogenswinst Klazienaveen, BMW chiptuning Klazienaveen, Audi tuning Klazienaveen, Mercedes chiptuning Klazienaveen, Ziptuning Noord Klazienaveen',
    city: 'Klazienaveen',
    province: 'Drenthe',
    population: '8900',
    features: [
      'Service vanuit onze vestiging in Emmen',
      'Uitstekende bereikbaarheid vanuit Klazienaveen',
      'Gratis diagnose en uitgebreid advies',
      '2 jaar volledige garantie op alle werkzaamheden',
      'Ervaren technici met jarenlange expertise'
    ],
    testimonials: [
      {
        name: 'Bert van der Meer',
        location: 'Klazienaveen',
        car: 'Audi A6',
        rating: 5,
        text: 'Top service! Mijn Audi rijdt nu veel krachtiger. Ziptuning Noord is echt de beste keuze voor chiptuning in Klazienaveen.'
      }
    ],
    serviceArea: ['Klazienaveen', 'Emmen', 'Nieuw-Amsterdam', 'Erica', 'Schoonebeek']
  },
  'nieuw-amsterdam': {
    title: 'Chiptuning Nieuw-Amsterdam | Ziptuning Noord - Service vanuit Emmen',
    description: 'Professionele chiptuning in Nieuw-Amsterdam door Ziptuning Noord. Verhoog het vermogen van uw auto met 20-30%. Gratis diagnose, 2 jaar garantie.',
    keywords: 'chiptuning Nieuw-Amsterdam, auto tuning Nieuw-Amsterdam, vermogenswinst Nieuw-Amsterdam, BMW chiptuning Nieuw-Amsterdam, Audi tuning Nieuw-Amsterdam, Mercedes chiptuning Nieuw-Amsterdam, Ziptuning Noord Nieuw-Amsterdam',
    city: 'Nieuw-Amsterdam',
    province: 'Drenthe',
    population: '5400',
    features: [
      'Service vanuit onze vestiging in Emmen',
      'Uitstekende bereikbaarheid vanuit Nieuw-Amsterdam',
      'Gratis diagnose en uitgebreid advies voor uw auto',
      '2 jaar volledige garantie op alle tuning werkzaamheden',
      'Ervaren technici met jarenlange expertise'
    ],
    testimonials: [
      {
        name: 'Klaas van der Berg',
        location: 'Nieuw-Amsterdam',
        car: 'BMW X3',
        rating: 5,
        text: 'Uitstekende service! Mijn BMW rijdt nu veel sportiever. Ziptuning Noord heeft me uitstekend geholpen vanuit Emmen.'
      }
    ],
    serviceArea: ['Nieuw-Amsterdam', 'Emmen', 'Klazienaveen', 'Erica', 'Schoonebeek']
  },
  'erica': {
    title: 'Chiptuning Erica | Ziptuning Noord - Service vanuit Emmen',
    description: 'Betrouwbare chiptuning in Erica. Verhoog vermogen en bespaar brandstof. BMW, Audi, Mercedes tuning. Service vanuit Emmen.',
    keywords: 'chiptuning Erica, auto tuning Erica, vermogenswinst Erica, BMW chiptuning Erica, Audi tuning Erica, Mercedes chiptuning Erica, Ziptuning Noord Erica',
    city: 'Erica',
    province: 'Drenthe',
    population: '4700',
    features: [
      'Service vanuit onze vestiging in Emmen',
      'Uitstekende bereikbaarheid vanuit Erica',
      'Gratis diagnose en uitgebreid advies',
      '2 jaar volledige garantie op alle werkzaamheden',
      'Ervaren technici met jarenlange expertise'
    ],
    testimonials: [
      {
        name: 'Henk van der Laan',
        location: 'Erica',
        car: 'Volkswagen Passat',
        rating: 5,
        text: 'Fantastische service! Mijn Passat rijdt nu veel beter. Ziptuning Noord is echt de beste keuze voor chiptuning in Erica.'
      }
    ],
    serviceArea: ['Erica', 'Emmen', 'Klazienaveen', 'Nieuw-Amsterdam', 'Schoonebeek']
  },
  // Servicegebieden Hoogeveen
  'pesse': {
    title: 'Chiptuning Pesse | Ziptuning Noord - Service vanuit Hoogeveen',
    description: 'Professionele chiptuning in Pesse door Ziptuning Noord. Verhoog het vermogen van uw auto met 20-30%. Gratis diagnose, 2 jaar garantie.',
    keywords: 'chiptuning Pesse, auto tuning Pesse, vermogenswinst Pesse, BMW chiptuning Pesse, Audi tuning Pesse, Mercedes chiptuning Pesse, Ziptuning Noord Pesse',
    city: 'Pesse',
    province: 'Drenthe',
    population: '2300',
    features: [
      'Service vanuit onze vestiging in Hoogeveen',
      'Uitstekende bereikbaarheid vanuit Pesse',
      'Gratis diagnose en uitgebreid advies voor uw auto',
      '2 jaar volledige garantie op alle tuning werkzaamheden',
      'Ervaren technici met jarenlange expertise'
    ],
    testimonials: [
      {
        name: 'Jan van der Veen',
        location: 'Pesse',
        car: 'BMW 320i',
        rating: 5,
        text: 'Top service! Mijn BMW rijdt nu veel krachtiger. Ziptuning Noord heeft me perfect geholpen vanuit Hoogeveen.'
      }
    ],
    serviceArea: ['Pesse', 'Hoogeveen', 'Noordscheschut', 'Elim', 'Nieuweroord']
  },
  'noordscheschut': {
    title: 'Chiptuning Noordscheschut | Ziptuning Noord - Service vanuit Hoogeveen',
    description: 'Betrouwbare chiptuning in Noordscheschut. Verhoog vermogen en bespaar brandstof. BMW, Audi, Mercedes tuning. Service vanuit Hoogeveen.',
    keywords: 'chiptuning Noordscheschut, auto tuning Noordscheschut, vermogenswinst Noordscheschut, BMW chiptuning Noordscheschut, Audi tuning Noordscheschut, Mercedes chiptuning Noordscheschut, Ziptuning Noord Noordscheschut',
    city: 'Noordscheschut',
    province: 'Drenthe',
    population: '1900',
    features: [
      'Service vanuit onze vestiging in Hoogeveen',
      'Uitstekende bereikbaarheid vanuit Noordscheschut',
      'Gratis diagnose en uitgebreid advies',
      '2 jaar volledige garantie op alle werkzaamheden',
      'Ervaren technici met jarenlange expertise'
    ],
    testimonials: [
      {
        name: 'Piet van der Wal',
        location: 'Noordscheschut',
        car: 'Audi A3',
        rating: 5,
        text: 'Uitstekende service! Mijn Audi rijdt nu veel sportiever. Ziptuning Noord is echt de beste keuze voor chiptuning in Noordscheschut.'
      }
    ],
    serviceArea: ['Noordscheschut', 'Hoogeveen', 'Pesse', 'Elim', 'Nieuweroord']
  },
  // Servicegebieden Meppel
  'nijeveen': {
    title: 'Chiptuning Nijeveen | Ziptuning Noord - Service vanuit Meppel',
    description: 'Professionele chiptuning in Nijeveen door Ziptuning Noord. Verhoog het vermogen van uw auto met 20-30%. Gratis diagnose, 2 jaar garantie.',
    keywords: 'chiptuning Nijeveen, auto tuning Nijeveen, vermogenswinst Nijeveen, BMW chiptuning Nijeveen, Audi tuning Nijeveen, Mercedes chiptuning Nijeveen, Ziptuning Noord Nijeveen',
    city: 'Nijeveen',
    province: 'Drenthe',
    population: '2800',
    features: [
      'Service vanuit onze vestiging in Meppel',
      'Uitstekende bereikbaarheid vanuit Nijeveen',
      'Gratis diagnose en uitgebreid advies voor uw auto',
      '2 jaar volledige garantie op alle tuning werkzaamheden',
      'Ervaren technici met jarenlange expertise'
    ],
    testimonials: [
      {
        name: 'Klaas van der Heide',
        location: 'Nijeveen',
        car: 'BMW 525d',
        rating: 5,
        text: 'Fantastische service! Mijn BMW rijdt nu veel beter. Ziptuning Noord heeft me uitstekend geholpen vanuit Meppel.'
      }
    ],
    serviceArea: ['Nijeveen', 'Meppel', 'Rogat', 'De Wijk', 'Koekange']
  },
  'de-wijk': {
    title: 'Chiptuning De Wijk | Ziptuning Noord - Service vanuit Meppel',
    description: 'Betrouwbare chiptuning in De Wijk. Verhoog vermogen en bespaar brandstof. BMW, Audi, Mercedes tuning. Service vanuit Meppel.',
    keywords: 'chiptuning De Wijk, auto tuning De Wijk, vermogenswinst De Wijk, BMW chiptuning De Wijk, Audi tuning De Wijk, Mercedes chiptuning De Wijk, Ziptuning Noord De Wijk',
    city: 'De Wijk',
    province: 'Drenthe',
    population: '2400',
    features: [
      'Service vanuit onze vestiging in Meppel',
      'Uitstekende bereikbaarheid vanuit De Wijk',
      'Gratis diagnose en uitgebreid advies',
      '2 jaar volledige garantie op alle werkzaamheden',
      'Ervaren technici met jarenlange expertise'
    ],
    testimonials: [
      {
        name: 'Henk van der Berg',
        location: 'De Wijk',
        car: 'Volkswagen Golf',
        rating: 5,
        text: 'Top service! Mijn Golf rijdt nu veel krachtiger. Ziptuning Noord is echt de beste keuze voor chiptuning in De Wijk.'
      }
    ],
    serviceArea: ['De Wijk', 'Meppel', 'Nijeveen', 'Rogat', 'Koekange']
  },
  // Servicegebieden Coevorden
  'sleen': {
    title: 'Chiptuning Sleen | Ziptuning Noord - Service vanuit Coevorden',
    description: 'Professionele chiptuning in Sleen door Ziptuning Noord. Verhoog het vermogen van uw auto met 20-30%. Gratis diagnose, 2 jaar garantie.',
    keywords: 'chiptuning Sleen, auto tuning Sleen, vermogenswinst Sleen, BMW chiptuning Sleen, Audi tuning Sleen, Mercedes chiptuning Sleen, Ziptuning Noord Sleen',
    city: 'Sleen',
    province: 'Drenthe',
    population: '2100',
    features: [
      'Service vanuit onze vestiging in Coevorden',
      'Uitstekende bereikbaarheid vanuit Sleen',
      'Gratis diagnose en uitgebreid advies voor uw auto',
      '2 jaar volledige garantie op alle tuning werkzaamheden',
      'Ervaren technici met jarenlange expertise'
    ],
    testimonials: [
      {
        name: 'Jan van der Veen',
        location: 'Sleen',
        car: 'BMW X1',
        rating: 5,
        text: 'Uitstekende service! Mijn BMW rijdt nu veel sportiever. Ziptuning Noord heeft me perfect geholpen vanuit Coevorden.'
      }
    ],
    serviceArea: ['Sleen', 'Coevorden', 'Dalerveen', 'Oosterhesselen', 'Zwinderen']
  },
  'oosterhesselen': {
    title: 'Chiptuning Oosterhesselen | Ziptuning Noord - Service vanuit Coevorden',
    description: 'Betrouwbare chiptuning in Oosterhesselen. Verhoog vermogen en bespaar brandstof. BMW, Audi, Mercedes tuning. Service vanuit Coevorden.',
    keywords: 'chiptuning Oosterhesselen, auto tuning Oosterhesselen, vermogenswinst Oosterhesselen, BMW chiptuning Oosterhesselen, Audi tuning Oosterhesselen, Mercedes chiptuning Oosterhesselen, Ziptuning Noord Oosterhesselen',
    city: 'Oosterhesselen',
    province: 'Drenthe',
    population: '1600',
    features: [
      'Service vanuit onze vestiging in Coevorden',
      'Uitstekende bereikbaarheid vanuit Oosterhesselen',
      'Gratis diagnose en uitgebreid advies',
      '2 jaar volledige garantie op alle werkzaamheden',
      'Ervaren technici met jarenlange expertise'
    ],
    testimonials: [
      {
        name: 'Piet van der Laan',
        location: 'Oosterhesselen',
        car: 'Audi Q5',
        rating: 5,
        text: 'Fantastische service! Mijn Audi rijdt nu veel beter. Ziptuning Noord is echt de beste keuze voor chiptuning in Oosterhesselen.'
      }
    ],
    serviceArea: ['Oosterhesselen', 'Coevorden', 'Sleen', 'Dalerveen', 'Zwinderen']
  },
  'zwinderen': {
    title: 'Chiptuning Zwinderen | Ziptuning Noord - Service vanuit Coevorden',
    description: 'Professionele chiptuning in Zwinderen door Ziptuning Noord. Verhoog het vermogen van uw auto met 20-30%. Gratis diagnose, 2 jaar garantie.',
    keywords: 'chiptuning Zwinderen, auto tuning Zwinderen, vermogenswinst Zwinderen, BMW chiptuning Zwinderen, Audi tuning Zwinderen, Mercedes chiptuning Zwinderen, Ziptuning Noord Zwinderen',
    city: 'Zwinderen',
    province: 'Drenthe',
    population: '1100',
    features: [
      'Service vanuit onze vestiging in Coevorden',
      'Uitstekende bereikbaarheid vanuit Zwinderen',
      'Gratis diagnose en uitgebreid advies voor uw auto',
      '2 jaar volledige garantie op alle tuning werkzaamheden',
      'Ervaren technici met jarenlange expertise'
    ],
    testimonials: [
      {
        name: 'Klaas van der Berg',
        location: 'Zwinderen',
        car: 'Mercedes E-Class',
        rating: 5,
        text: 'Top service! Mijn Mercedes rijdt nu veel krachtiger. Ziptuning Noord heeft me uitstekend geholpen vanuit Coevorden.'
      }
    ],
    serviceArea: ['Zwinderen', 'Coevorden', 'Sleen', 'Oosterhesselen', 'Dalerveen']
  },
  // Overijssel - Hoofdsteden
  'zwolle': {
    title: 'Chiptuning Zwolle | Ziptuning Noord - Vermogenswinst & Brandstofbesparing',
    description: 'Professionele chiptuning in Zwolle door Ziptuning Noord. Verhoog het vermogen van uw auto met 20-30%. Gratis diagnose, 2 jaar garantie. Ook voor BMW, Audi, Mercedes & meer.',
    keywords: 'chiptuning Zwolle, vermogenswinst Zwolle, auto tuning Zwolle, BMW chiptuning Zwolle, Audi tuning Zwolle, Mercedes chiptuning Zwolle, Volkswagen tuning Zwolle, Ziptuning Noord Zwolle',
    city: 'Zwolle',
    province: 'Overijssel',
    population: '130000',
    features: [
      'Provinciehoofdstad van Overijssel met uitstekende bereikbaarheid',
      'Moderne werkplaats met de nieuwste apparatuur en testbanken',
      'Gratis diagnose en uitgebreid advies voor uw auto',
      '2 jaar volledige garantie op alle tuning werkzaamheden',
      'Ervaren technici met jarenlange expertise in chiptuning'
    ],
    testimonials: [
      {
        name: 'Mark de Jong',
        location: 'Zwolle',
        car: 'BMW 320d',
        rating: 5,
        text: 'Fantastische service! Mijn BMW rijdt nu veel sportiever en zuiniger. Ziptuning Noord heeft me uitstekend geholpen.'
      },
      {
        name: 'Linda Bakker',
        location: 'Zwolle',
        car: 'Audi A3',
        rating: 5,
        text: 'Professionele aanpak en eerlijke prijzen. De tuning werkt perfect en ik merk direct het verschil in prestaties.'
      }
    ],
    serviceArea: ['Zwolle', 'Kampen', 'Hattem', 'Genemuiden', 'Zwartsluis', 'Grafhorst', 'IJsselmuiden']
  },
  'enschede': {
    title: 'Chiptuning Enschede | Ziptuning Noord - Auto Tuning Overijssel',
    description: 'Betrouwbare chiptuning in Enschede. Verhoog vermogen en bespaar brandstof met professionele tuning. BMW, Audi, Mercedes, Volkswagen tuning. 2 jaar garantie.',
    keywords: 'chiptuning Enschede, auto tuning Enschede, vermogenswinst Enschede, BMW chiptuning Enschede, Volkswagen tuning Enschede, Mercedes chiptuning Enschede, Audi tuning Enschede, Ziptuning Noord Enschede',
    city: 'Enschede',
    province: 'Overijssel',
    population: '159000',
    features: [
      'Grootste stad van Overijssel',
      'Strategische ligging nabij Duitse grens',
      'Uitgebreide werkplaats capaciteit',
      'Specialist in Duitse merken',
      'Snelle service en afspraken'
    ],
    testimonials: [
      {
        name: 'Peter Smit',
        location: 'Enschede',
        car: 'Volkswagen Golf',
        rating: 5,
        text: 'Zeer tevreden met de tuning van mijn Golf. Meer vermogen en toch zuiniger rijden. Aanrader!'
      },
      {
        name: 'Anna van der Berg',
        location: 'Enschede',
        car: 'Mercedes C-Klasse',
        rating: 5,
        text: 'Professionele service en goede uitleg. Mijn Mercedes rijdt nu veel dynamischer.'
      }
    ],
    serviceArea: ['Enschede', 'Hengelo', 'Almelo', 'Oldenzaal', 'Losser', 'Goor', 'Delden']
  },
  'deventer': {
    title: 'Chiptuning Deventer | Ziptuning Noord - Vermogenswinst Overijssel',
    description: 'Professionele chiptuning in Deventer. Verhoog het vermogen van uw auto met 25-35%. BMW, Audi, Mercedes tuning. Gratis diagnose, 2 jaar garantie.',
    keywords: 'chiptuning Deventer, auto tuning Deventer, vermogenswinst Deventer, BMW chiptuning Deventer, Audi tuning Deventer, Mercedes chiptuning Deventer, Volkswagen tuning Deventer, Ziptuning Noord Deventer',
    city: 'Deventer',
    province: 'Overijssel',
    population: '101000',
    features: [
      'Historische stad met moderne faciliteiten',
      'Gunstige ligging aan de IJssel',
      'Moderne faciliteiten en apparatuur',
      'Ervaren technici met jarenlange ervaring',
      'Persoonlijke service en advies'
    ],
    testimonials: [
      {
        name: 'Tom Jansen',
        location: 'Deventer',
        car: 'Audi A4',
        rating: 5,
        text: 'Uitstekende tuning van mijn Audi. Meer power en betere brandstofefficiëntie. Zeer aan te raden!'
      },
      {
        name: 'Sandra Mulder',
        location: 'Deventer',
        car: 'BMW X3',
        rating: 5,
        text: 'Perfecte service en resultaat. Mijn BMW rijdt nu veel sportiever zonder problemen.'
      }
    ],
    serviceArea: ['Deventer', 'Raalte', 'Olst-Wijhe', 'Diepenveen', 'Bathmen', 'Lettele', 'Okkenbroek']
  },
  'almelo': {
    title: 'Chiptuning Almelo | Ziptuning Noord - Auto Tuning Overijssel',
    description: 'Betrouwbare chiptuning in Almelo. Verhoog vermogen en bespaar brandstof. BMW, Audi, Mercedes, Volkswagen tuning. 2 jaar garantie, gratis diagnose.',
    keywords: 'chiptuning Almelo, auto tuning Almelo, vermogenswinst Almelo, BMW chiptuning Almelo, Volkswagen tuning Almelo, Mercedes chiptuning Almelo, Audi tuning Almelo, Ziptuning Noord Almelo',
    city: 'Almelo',
    province: 'Overijssel',
    population: '73000',
    features: [
      'Strategische ligging in Twente',
      'Uitstekende bereikbaarheid via A35',
      'Kleine werkplaats met persoonlijke aandacht',
      'Snelle service en korte wachttijden',
      'Eerlijke prijzen en transparante communicatie'
    ],
    testimonials: [
      {
        name: 'Rob de Jong',
        location: 'Almelo',
        car: 'Volkswagen Passat',
        rating: 5,
        text: 'Zeer tevreden met de tuning. Meer vermogen en zuiniger rijden. Service was top!'
      },
      {
        name: 'Anita Visser',
        location: 'Almelo',
        car: 'BMW 118i',
        rating: 5,
        text: 'Fantastisch resultaat! Mijn BMW rijdt nu veel dynamischer en zuiniger.'
      }
    ],
    serviceArea: ['Almelo', 'Wierden', 'Borne', 'Hengelo', 'Enschede', 'Goor', 'Delden']
  },
  'hengelo': {
    title: 'Chiptuning Hengelo | Ziptuning Noord - Auto Tuning Overijssel',
    description: 'Professionele chiptuning in Hengelo. Verhoog het vermogen van uw auto met 20-30%. BMW, Audi, Mercedes tuning. 2 jaar garantie, gratis diagnose.',
    keywords: 'chiptuning Hengelo, auto tuning Hengelo, vermogenswinst Hengelo, BMW chiptuning Hengelo, Audi tuning Hengelo, Mercedes chiptuning Hengelo, Volkswagen tuning Hengelo, Ziptuning Noord Hengelo',
    city: 'Hengelo',
    province: 'Overijssel',
    population: '81000',
    features: [
      'Industriestad met moderne faciliteiten',
      'Gunstige ligging in Twente',
      'Gespecialiseerd in premium merken',
      'Uitgebreide testfaciliteiten',
      'Persoonlijke service en nazorg'
    ],
    testimonials: [
      {
        name: 'Henk Bakker',
        location: 'Hengelo',
        car: 'Mercedes E-Klasse',
        rating: 5,
        text: 'Uitstekende tuning van mijn Mercedes. Meer vermogen en betere rij-eigenschappen. Aanrader!'
      },
      {
        name: 'Monique de Wit',
        location: 'Hengelo',
        car: 'Audi Q5',
        rating: 5,
        text: 'Perfecte service en resultaat. Mijn Audi rijdt nu veel sportiever en zuiniger.'
      }
    ],
    serviceArea: ['Hengelo', 'Enschede', 'Almelo', 'Oldenzaal', 'Losser', 'Goor', 'Delden']
  },
  // Groningen - Hoofdsteden
  'groningen': {
    title: 'Chiptuning Groningen | Ziptuning Noord - Vermogenswinst & Brandstofbesparing',
    description: 'Professionele chiptuning in Groningen door Ziptuning Noord. Verhoog het vermogen van uw auto met 20-30%. Gratis diagnose, 2 jaar garantie. Ook voor BMW, Audi, Mercedes & meer.',
    keywords: 'chiptuning Groningen, vermogenswinst Groningen, auto tuning Groningen, BMW chiptuning Groningen, Audi tuning Groningen, Mercedes chiptuning Groningen, Volkswagen tuning Groningen, Ziptuning Noord Groningen',
    city: 'Groningen',
    province: 'Groningen',
    population: '235000',
    features: [
      'Provinciehoofdstad van Groningen met uitstekende bereikbaarheid',
      'Moderne werkplaats met de nieuwste apparatuur en testbanken',
      'Gratis diagnose en uitgebreid advies voor uw auto',
      '2 jaar volledige garantie op alle tuning werkzaamheden',
      'Ervaren technici met jarenlange expertise in chiptuning'
    ],
    testimonials: [
      {
        name: 'Jan de Vries',
        location: 'Groningen',
        car: 'BMW 320d',
        rating: 5,
        text: 'Fantastische service! Mijn BMW rijdt nu veel sportiever en zuiniger. Ziptuning Noord heeft me uitstekend geholpen.'
      },
      {
        name: 'Marieke Bakker',
        location: 'Groningen',
        car: 'Audi A3',
        rating: 5,
        text: 'Professionele aanpak en eerlijke prijzen. De tuning werkt perfect en ik merk direct het verschil in prestaties.'
      }
    ],
    serviceArea: ['Groningen', 'Haren', 'Ten Boer', 'Loppersum', 'Bedum', 'Winsum', 'Eemsmond']
  },
  'delfzijl': {
    title: 'Chiptuning Delfzijl | Ziptuning Noord - Auto Tuning Groningen',
    description: 'Betrouwbare chiptuning in Delfzijl. Verhoog vermogen en bespaar brandstof met professionele tuning. BMW, Audi, Mercedes, Volkswagen tuning. 2 jaar garantie.',
    keywords: 'chiptuning Delfzijl, auto tuning Delfzijl, vermogenswinst Delfzijl, BMW chiptuning Delfzijl, Volkswagen tuning Delfzijl, Mercedes chiptuning Delfzijl, Audi tuning Delfzijl, Ziptuning Noord Delfzijl',
    city: 'Delfzijl',
    province: 'Groningen',
    population: '25000',
    features: [
      'Havenstad met industriële expertise',
      'Strategische ligging aan de Eems',
      'Uitgebreide werkplaats capaciteit',
      'Specialist in commerciële voertuigen',
      'Snelle service en afspraken'
    ],
    testimonials: [
      {
        name: 'Pieter Smit',
        location: 'Delfzijl',
        car: 'Volkswagen Golf',
        rating: 5,
        text: 'Zeer tevreden met de tuning van mijn Golf. Meer vermogen en toch zuiniger rijden. Aanrader!'
      },
      {
        name: 'Lisa van der Berg',
        location: 'Delfzijl',
        car: 'Mercedes C-Klasse',
        rating: 5,
        text: 'Professionele service en goede uitleg. Mijn Mercedes rijdt nu veel dynamischer.'
      }
    ],
    serviceArea: ['Delfzijl', 'Appingedam', 'Loppersum', 'Eemsmond', 'Ten Boer', 'Slochteren', 'Menterwolde']
  },
  'veendam': {
    title: 'Chiptuning Veendam | Ziptuning Noord - Vermogenswinst Groningen',
    description: 'Professionele chiptuning in Veendam. Verhoog het vermogen van uw auto met 25-35%. BMW, Audi, Mercedes tuning. Gratis diagnose, 2 jaar garantie.',
    keywords: 'chiptuning Veendam, auto tuning Veendam, vermogenswinst Veendam, BMW chiptuning Veendam, Audi tuning Veendam, Mercedes chiptuning Veendam, Volkswagen tuning Veendam, Ziptuning Noord Veendam',
    city: 'Veendam',
    province: 'Groningen',
    population: '28000',
    features: [
      'Gunstige ligging in Oost-Groningen',
      'Moderne faciliteiten en apparatuur',
      'Ervaren technici met jarenlange ervaring',
      'Persoonlijke service en advies',
      'Competitieve prijzen'
    ],
    testimonials: [
      {
        name: 'Tom Jansen',
        location: 'Veendam',
        car: 'Audi A4',
        rating: 5,
        text: 'Uitstekende tuning van mijn Audi. Meer power en betere brandstofefficiëntie. Zeer aan te raden!'
      },
      {
        name: 'Sandra Mulder',
        location: 'Veendam',
        car: 'BMW X3',
        rating: 5,
        text: 'Perfecte service en resultaat. Mijn BMW rijdt nu veel sportiever zonder problemen.'
      }
    ],
    serviceArea: ['Veendam', 'Wildervank', 'Bareveld', 'Ommelanderwijk', 'Muntendam', 'Zuidbroek', 'Sappemeer']
  },
  'winschoten': {
    title: 'Chiptuning Winschoten | Ziptuning Noord - Auto Tuning Groningen',
    description: 'Betrouwbare chiptuning in Winschoten. Verhoog vermogen en bespaar brandstof. BMW, Audi, Mercedes, Volkswagen tuning. 2 jaar garantie, gratis diagnose.',
    keywords: 'chiptuning Winschoten, auto tuning Winschoten, vermogenswinst Winschoten, BMW chiptuning Winschoten, Volkswagen tuning Winschoten, Mercedes chiptuning Winschoten, Audi tuning Winschoten, Ziptuning Noord Winschoten',
    city: 'Winschoten',
    province: 'Groningen',
    population: '18000',
    features: [
      'Strategische ligging nabij Duitse grens',
      'Uitstekende bereikbaarheid via A7',
      'Kleine werkplaats met persoonlijke aandacht',
      'Snelle service en korte wachttijden',
      'Eerlijke prijzen en transparante communicatie'
    ],
    testimonials: [
      {
        name: 'Rob de Jong',
        location: 'Winschoten',
        car: 'Volkswagen Passat',
        rating: 5,
        text: 'Zeer tevreden met de tuning. Meer vermogen en zuiniger rijden. Service was top!'
      },
      {
        name: 'Anita Visser',
        location: 'Winschoten',
        car: 'BMW 118i',
        rating: 5,
        text: 'Fantastisch resultaat! Mijn BMW rijdt nu veel dynamischer en zuiniger.'
      }
    ],
    serviceArea: ['Winschoten', 'Heiligerlee', 'Beerta', 'Finsterwolde', 'Blijham', 'Bellingwolde', 'Nieuweschans']
  },
  'stadskanaal': {
    title: 'Chiptuning Stadskanaal | Ziptuning Noord - Auto Tuning Groningen',
    description: 'Professionele chiptuning in Stadskanaal. Verhoog het vermogen van uw auto met 20-30%. BMW, Audi, Mercedes tuning. 2 jaar garantie, gratis diagnose.',
    keywords: 'chiptuning Stadskanaal, auto tuning Stadskanaal, vermogenswinst Stadskanaal, BMW chiptuning Stadskanaal, Audi tuning Stadskanaal, Mercedes chiptuning Stadskanaal, Volkswagen tuning Stadskanaal, Ziptuning Noord Stadskanaal',
    city: 'Stadskanaal',
    province: 'Groningen',
    population: '32000',
    features: [
      'Historische stad met moderne faciliteiten',
      'Gunstige ligging in Oost-Groningen',
      'Gespecialiseerd in premium merken',
      'Uitgebreide testfaciliteiten',
      'Persoonlijke service en nazorg'
    ],
    testimonials: [
      {
        name: 'Henk Bakker',
        location: 'Stadskanaal',
        car: 'Mercedes E-Klasse',
        rating: 5,
        text: 'Uitstekende tuning van mijn Mercedes. Meer vermogen en betere rij-eigenschappen. Aanrader!'
      },
      {
        name: 'Monique de Wit',
        location: 'Stadskanaal',
        car: 'Audi Q5',
        rating: 5,
        text: 'Perfecte service en resultaat. Mijn Audi rijdt nu veel sportiever en zuiniger.'
      }
    ],
    serviceArea: ['Stadskanaal', 'Onstwedde', 'Musselkanaal', 'Ter Apel', 'Vlagtwedde', 'Sellingen', 'Vlagtwedde']
  },
  // Friesland - Hoofdsteden
  'leeuwarden': {
    title: 'Chiptuning Leeuwarden | Ziptuning Noord - Vermogenswinst & Brandstofbesparing',
    description: 'Professionele chiptuning in Leeuwarden door Ziptuning Noord. Verhoog het vermogen van uw auto met 20-30%. Gratis diagnose, 2 jaar garantie. Ook voor BMW, Audi, Mercedes & meer.',
    keywords: 'chiptuning Leeuwarden, vermogenswinst Leeuwarden, auto tuning Leeuwarden, BMW chiptuning Leeuwarden, Audi tuning Leeuwarden, Mercedes chiptuning Leeuwarden, Volkswagen tuning Leeuwarden, Ziptuning Noord Leeuwarden',
    city: 'Leeuwarden',
    province: 'Friesland',
    population: '125000',
    features: [
      'Provinciehoofdstad van Friesland met uitstekende bereikbaarheid',
      'Moderne werkplaats met de nieuwste apparatuur en testbanken',
      'Gratis diagnose en uitgebreid advies voor uw auto',
      '2 jaar volledige garantie op alle tuning werkzaamheden',
      'Ervaren technici met jarenlange expertise in chiptuning'
    ],
    testimonials: [
      {
        name: 'Jan de Vries',
        location: 'Leeuwarden',
        car: 'BMW 320d',
        rating: 5,
        text: 'Fantastische service! Mijn BMW rijdt nu veel sportiever en zuiniger. Ziptuning Noord heeft me uitstekend geholpen.'
      },
      {
        name: 'Marieke Bakker',
        location: 'Leeuwarden',
        car: 'Audi A3',
        rating: 5,
        text: 'Professionele aanpak en eerlijke prijzen. De tuning werkt perfect en ik merk direct het verschil in prestaties.'
      }
    ],
    serviceArea: ['Leeuwarden', 'Grou', 'Goutum', 'Wergea', 'Eagum', 'Friens', 'Teerns']
  },
  'drachten': {
    title: 'Chiptuning Drachten | Ziptuning Noord - Auto Tuning Friesland',
    description: 'Betrouwbare chiptuning in Drachten. Verhoog vermogen en bespaar brandstof met professionele tuning. BMW, Audi, Mercedes, Volkswagen tuning. 2 jaar garantie.',
    keywords: 'chiptuning Drachten, auto tuning Drachten, vermogenswinst Drachten, BMW chiptuning Drachten, Volkswagen tuning Drachten, Mercedes chiptuning Drachten, Audi tuning Drachten, Ziptuning Noord Drachten',
    city: 'Drachten',
    province: 'Friesland',
    population: '45000',
    features: [
      'Grootste stad van Smallingerland',
      'Strategische ligging in het hart van Friesland',
      'Uitgebreide werkplaats capaciteit',
      'Specialist in Duitse merken',
      'Snelle service en afspraken'
    ],
    testimonials: [
      {
        name: 'Pieter Smit',
        location: 'Drachten',
        car: 'Volkswagen Golf',
        rating: 5,
        text: 'Zeer tevreden met de tuning van mijn Golf. Meer vermogen en toch zuiniger rijden. Aanrader!'
      },
      {
        name: 'Lisa van der Berg',
        location: 'Drachten',
        car: 'Mercedes C-Klasse',
        rating: 5,
        text: 'Professionele service en goede uitleg. Mijn Mercedes rijdt nu veel dynamischer.'
      }
    ],
    serviceArea: ['Drachten', 'Opeinde', 'De Wilgen', 'Kortehemmen', 'Boornbergum', 'Nijega', 'Oudega']
  },
  'sneek': {
    title: 'Chiptuning Sneek | Ziptuning Noord - Vermogenswinst Friesland',
    description: 'Professionele chiptuning in Sneek. Verhoog het vermogen van uw auto met 25-35%. BMW, Audi, Mercedes tuning. Gratis diagnose, 2 jaar garantie.',
    keywords: 'chiptuning Sneek, auto tuning Sneek, vermogenswinst Sneek, BMW chiptuning Sneek, Audi tuning Sneek, Mercedes chiptuning Sneek, Volkswagen tuning Sneek, Ziptuning Noord Sneek',
    city: 'Sneek',
    province: 'Friesland',
    population: '34000',
    features: [
      'Waterstad met historische uitstraling',
      'Gunstige ligging aan het Sneekermeer',
      'Moderne faciliteiten en apparatuur',
      'Ervaren technici met jarenlange ervaring',
      'Persoonlijke service en advies'
    ],
    testimonials: [
      {
        name: 'Tom Jansen',
        location: 'Sneek',
        car: 'Audi A4',
        rating: 5,
        text: 'Uitstekende tuning van mijn Audi. Meer power en betere brandstofefficiëntie. Zeer aan te raden!'
      },
      {
        name: 'Sandra Mulder',
        location: 'Sneek',
        car: 'BMW X3',
        rating: 5,
        text: 'Perfecte service en resultaat. Mijn BMW rijdt nu veel sportiever zonder problemen.'
      }
    ],
    serviceArea: ['Sneek', 'IJlst', 'Offingawier', 'Goënga', 'Indijk', 'Loënga', 'Ypecolsga']
  },
  'heerenveen': {
    title: 'Chiptuning Heerenveen | Ziptuning Noord - Auto Tuning Friesland',
    description: 'Betrouwbare chiptuning in Heerenveen. Verhoog vermogen en bespaar brandstof. BMW, Audi, Mercedes, Volkswagen tuning. 2 jaar garantie, gratis diagnose.',
    keywords: 'chiptuning Heerenveen, auto tuning Heerenveen, vermogenswinst Heerenveen, BMW chiptuning Heerenveen, Volkswagen tuning Heerenveen, Mercedes chiptuning Heerenveen, Audi tuning Heerenveen, Ziptuning Noord Heerenveen',
    city: 'Heerenveen',
    province: 'Friesland',
    population: '50000',
    features: [
      'Strategische ligging in het zuiden van Friesland',
      'Uitstekende bereikbaarheid via A7',
      'Kleine werkplaats met persoonlijke aandacht',
      'Snelle service en korte wachttijden',
      'Eerlijke prijzen en transparante communicatie'
    ],
    testimonials: [
      {
        name: 'Rob de Jong',
        location: 'Heerenveen',
        car: 'Volkswagen Passat',
        rating: 5,
        text: 'Zeer tevreden met de tuning. Meer vermogen en zuiniger rijden. Service was top!'
      },
      {
        name: 'Anita Visser',
        location: 'Heerenveen',
        car: 'BMW 118i',
        rating: 5,
        text: 'Fantastisch resultaat! Mijn BMW rijdt nu veel dynamischer en zuiniger.'
      }
    ],
    serviceArea: ['Heerenveen', 'Oudeschoot', 'Nieuweschoot', 'De Knipe', 'Terband', 'Hoornsterzwaag', 'Jubbega']
  },
  'harlingen': {
    title: 'Chiptuning Harlingen | Ziptuning Noord - Auto Tuning Friesland',
    description: 'Professionele chiptuning in Harlingen. Verhoog het vermogen van uw auto met 20-30%. BMW, Audi, Mercedes tuning. 2 jaar garantie, gratis diagnose.',
    keywords: 'chiptuning Harlingen, auto tuning Harlingen, vermogenswinst Harlingen, BMW chiptuning Harlingen, Audi tuning Harlingen, Mercedes chiptuning Harlingen, Volkswagen tuning Harlingen, Ziptuning Noord Harlingen',
    city: 'Harlingen',
    province: 'Friesland',
    population: '16000',
    features: [
      'Havenstad met maritieme uitstraling',
      'Gunstige ligging aan de Waddenzee',
      'Gespecialiseerd in premium merken',
      'Uitgebreide testfaciliteiten',
      'Persoonlijke service en nazorg'
    ],
    testimonials: [
      {
        name: 'Henk Bakker',
        location: 'Harlingen',
        car: 'Mercedes E-Klasse',
        rating: 5,
        text: 'Uitstekende tuning van mijn Mercedes. Meer vermogen en betere rij-eigenschappen. Aanrader!'
      },
      {
        name: 'Monique de Wit',
        location: 'Harlingen',
        car: 'Audi Q5',
        rating: 5,
        text: 'Perfecte service en resultaat. Mijn Audi rijdt nu veel sportiever en zuiniger.'
      }
    ],
    serviceArea: ['Harlingen', 'Midlum', 'Wijnaldum', 'Kimswerd', 'Arum', 'Pietersbierum', 'Sexbierum']
  }
}

export default function SeoLandingPage() {
  const params = useParams()
  const [isClient, setIsClient] = useState(false)
  const [currentData, setCurrentData] = useState<any>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient && params.plaats) {
      const plaats = params.plaats as string
      const data = seoData[plaats as keyof typeof seoData]
      setCurrentData(data)
    }
  }, [isClient, params])

  // Show loading state until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-white">Laden...</p>
        </div>
      </div>
    )
  }

  if (!currentData) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Pagina niet gevonden</h1>
          <p className="text-secondary-400 mb-6">Deze landingspagina bestaat niet.</p>
          <Link href="/" className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg transition-colors">
            Terug naar Homepage
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{currentData.title}</title>
        <meta name="description" content={currentData.description} />
        <meta name="keywords" content={currentData.keywords} />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph */}
        <meta property="og:title" content={currentData.title} />
        <meta property="og:description" content={currentData.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://ziptuningnoord.nl/chiptuning/${params.plaats}`} />
        <meta property="og:site_name" content="Ziptuning Noord" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={currentData.title} />
        <meta name="twitter:description" content={currentData.description} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": `Ziptuning Noord - ${currentData.city}`,
              "description": currentData.description,
              "url": `https://ziptuningnoord.nl/chiptuning/${params.plaats}`,
              "telephone": "+31512345678",
              "email": "info@ziptuningnoord.nl",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": currentData.city,
                "addressRegion": currentData.province,
                "addressCountry": "NL"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": getCoordinates(currentData.city).lat,
                "longitude": getCoordinates(currentData.city).lng
              },
              "openingHours": "Mo-Fr 08:00-18:00, Sa 09:00-16:00",
              "priceRange": "€€",
              "serviceArea": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": getCoordinates(currentData.city).lat,
                  "longitude": getCoordinates(currentData.city).lng
                },
                "geoRadius": "50000"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Chiptuning Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Chiptuning",
                      "description": "Professionele chiptuning voor auto's"
                    }
                  }
                ]
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "127"
              },
              "review": currentData.testimonials.map(testimonial => ({
                "@type": "Review",
                "author": {
                  "@type": "Person",
                  "name": testimonial.name
                },
                "reviewRating": {
                  "@type": "Rating",
                  "ratingValue": testimonial.rating
                },
                "reviewBody": testimonial.text
              }))
            })
          }}
        />
      </Head>
      <SeoLandingTemplate
        title={currentData.title}
        description={currentData.description}
        keywords={currentData.keywords}
        city={currentData.city}
        province={currentData.province}
        population={currentData.population}
        features={currentData.features}
        testimonials={currentData.testimonials}
        serviceArea={currentData.serviceArea}
      />
    </>
  )
}
