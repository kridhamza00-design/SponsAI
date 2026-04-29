export type EventStatus = 'active' | 'draft' | 'completed' | 'archived';
export type ContractStatus = 'pending' | 'negotiating' | 'signed' | 'rejected';
export type SenderType = 'organizer' | 'sponsor' | 'ai_agent';

export interface Event {
  id: string;
  orgId: string;
  name: string;
  description: string;
  targetBudget: number;
  collectedBudget: number;
  date: string;
  location: string;
  status: EventStatus;
  needs?: string[];
}

export interface Sponsor {
  id: string;
  name: string;
  industry: string;
  logo?: string;
}

export interface Contract {
  id: string;
  eventId: string;
  sponsorId: string;
  matchScore: number;
  agreedAmount: number;
  status: ContractStatus;
  sponsorName: string; // for easier display
}

export interface Message {
  id: string;
  contractId: string;
  senderType: SenderType;
  content: string;
  createdAt: string;
}
