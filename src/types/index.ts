export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'analyst' | 'viewer';
  avatar?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  tenure: number;
  monthlyCharges: number;
  totalCharges: number;
  churnProbability: number;
  riskLevel: 'low' | 'medium' | 'high';
  lifetimeValue: number;
  lastActivity: string;
  segment: string;
}

export interface ChurnMetrics {
  totalCustomers: number;
  churnRate: number;
  avgLifetimeValue: number;
  retentionRate: number;
  highRiskCustomers: number;
  monthlyTrend: Array<{
    month: string;
    churnRate: number;
    retentionRate: number;
  }>;
  segmentAnalysis: Array<{
    segment: string;
    customers: number;
    churnRate: number;
    avgValue: number;
  }>;
}

export interface PredictionJob {
  id: string;
  fileName: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  uploadedAt: string;
  completedAt?: string;
  totalRecords: number;
  processedRecords: number;
  results?: Customer[];
}