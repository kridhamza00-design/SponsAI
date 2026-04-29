import { Event, Contract, Message } from '../types';

export const MOCK_EVENTS: Event[] = [
  {
    id: 'e1',
    orgId: '1',
    name: 'Tech Summit Paris 2026',
    description: 'Le plus grand rassemblement tech d\'Europe.',
    targetBudget: 150000,
    collectedBudget: 85000,
    date: '2026-06-15',
    location: 'Paris, FR',
    status: 'active',
    needs: ['Sponsoring Financier', 'Matériel Informatique', 'Boissons']
  },
  {
    id: 'e2',
    orgId: '1',
    name: 'Green Expo Lyon',
    description: 'Transition écologique et durable.',
    targetBudget: 50000,
    collectedBudget: 12000,
    date: '2026-09-22',
    location: 'Lyon, FR',
    status: 'draft',
    needs: ['Visibilité', 'Stands']
  }
];

export const MOCK_CONTRACTS: Contract[] = [
  {
    id: 'c1',
    eventId: 'e1',
    sponsorId: 's1',
    sponsorName: 'EcoFlow',
    matchScore: 96,
    agreedAmount: 25000,
    status: 'negotiating'
  },
  {
    id: 'c2',
    eventId: 'e1',
    sponsorId: 's2',
    sponsorName: 'Back Market',
    matchScore: 92,
    agreedAmount: 15000,
    status: 'signed'
  },
  {
    id: 'c3',
    eventId: 'e1',
    sponsorId: 's3',
    sponsorName: 'Ledger',
    matchScore: 88,
    agreedAmount: 10000,
    status: 'pending'
  }
];

export const MOCK_MESSAGES: Message[] = [
  {
    id: 'm1',
    contractId: 'c1',
    senderType: 'organizer',
    content: "Bonjour EcoFlow, nous sommes ravis de votre intérêt pour le Tech Summit.",
    createdAt: '2026-04-29T10:00:00Z'
  },
  {
    id: 'm2',
    contractId: 'c1',
    senderType: 'sponsor',
    content: "Merci Sarah. Nous souhaitons savoir si l'exclusivité sectorielle est possible sur la section Énergie.",
    createdAt: '2026-04-29T10:15:00Z'
  },
  {
    id: 'm3',
    contractId: 'c1',
    senderType: 'ai_agent',
    content: "Note IA : L'exclusivité sur l'Énergie est disponible pour un pack Platinum (> 20k€). Souhaitez-vous que je propose cette option ?",
    createdAt: '2026-04-29T10:20:00Z'
  }
];
