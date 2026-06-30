export interface Booking {
  id: string;
  phone: string;
  fullName: string;
  district: string;
  symptomId: string;
  status: 'pending' | 'confirmed' | 'completed';
  createdAt: string;
}

export interface Symptom {
  id: string;
  title: string;
  shortDescription: string;
  detailedAnalysis: string;
  recommendedFix: string;
  estimatedPrice: string;
  isPopular?: boolean;
  severity: 'high' | 'medium' | 'low';
  icon: string; // lucide icon name
  badgeText?: string;
  actionText: string;
}

export interface PriceItem {
  id: string;
  name: string;
  description: string;
  price: string;
  unit: string;
  category: 'filter' | 'membrane' | 'functional' | 'pump' | 'power' | 'tank' | 'valve';
  isPopular?: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  phone?: string;
}
