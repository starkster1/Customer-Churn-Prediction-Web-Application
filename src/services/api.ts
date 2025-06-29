import { Customer, ChurnMetrics, PredictionJob } from '../types';

// Mock data for demonstration
const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    tenure: 24,
    monthlyCharges: 89.99,
    totalCharges: 2159.76,
    churnProbability: 0.85,
    riskLevel: 'high',
    lifetimeValue: 3200,
    lastActivity: '2024-01-15',
    segment: 'Premium'
  },
  {
    id: '2',
    name: 'Emily Davis',
    email: 'emily.davis@email.com',
    tenure: 36,
    monthlyCharges: 65.50,
    totalCharges: 2358.00,
    churnProbability: 0.23,
    riskLevel: 'low',
    lifetimeValue: 4800,
    lastActivity: '2024-01-20',
    segment: 'Standard'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.brown@email.com',
    tenure: 12,
    monthlyCharges: 120.00,
    totalCharges: 1440.00,
    churnProbability: 0.67,
    riskLevel: 'medium',
    lifetimeValue: 2100,
    lastActivity: '2024-01-18',
    segment: 'Enterprise'
  }
];

const mockMetrics: ChurnMetrics = {
  totalCustomers: 15420,
  churnRate: 0.18,
  avgLifetimeValue: 3250,
  retentionRate: 0.82,
  highRiskCustomers: 2784,
  monthlyTrend: [
    { month: 'Jul', churnRate: 0.15, retentionRate: 0.85 },
    { month: 'Aug', churnRate: 0.17, retentionRate: 0.83 },
    { month: 'Sep', churnRate: 0.16, retentionRate: 0.84 },
    { month: 'Oct', churnRate: 0.19, retentionRate: 0.81 },
    { month: 'Nov', churnRate: 0.18, retentionRate: 0.82 },
    { month: 'Dec', churnRate: 0.20, retentionRate: 0.80 }
  ],
  segmentAnalysis: [
    { segment: 'Premium', customers: 4200, churnRate: 0.12, avgValue: 4500 },
    { segment: 'Standard', customers: 8900, churnRate: 0.18, avgValue: 2800 },
    { segment: 'Enterprise', customers: 2320, churnRate: 0.25, avgValue: 5200 }
  ]
};

export const apiService = {
  // Authentication
  async login(email: string, password: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return email === 'admin@company.com' && password === 'admin123';
  },

  // Dashboard metrics
  async getChurnMetrics(): Promise<ChurnMetrics> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockMetrics;
  },

  // Customer data
  async getCustomers(): Promise<Customer[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockCustomers;
  },

  // File upload and prediction
  async uploadFile(file: File): Promise<PredictionJob> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const job: PredictionJob = {
      id: Date.now().toString(),
      fileName: file.name,
      status: 'processing',
      uploadedAt: new Date().toISOString(),
      totalRecords: Math.floor(Math.random() * 1000) + 100,
      processedRecords: 0
    };

    // Simulate processing
    setTimeout(() => {
      job.status = 'completed';
      job.completedAt = new Date().toISOString();
      job.processedRecords = job.totalRecords;
      job.results = mockCustomers;
    }, 3000);

    return job;
  },

  // Prediction results
  async getPredictionResults(jobId: string): Promise<Customer[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockCustomers;
  },

  // Export results
  async exportResults(customers: Customer[], format: 'csv' | 'xlsx'): Promise<Blob> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (format === 'csv') {
      const headers = ['Name', 'Email', 'Churn Probability', 'Risk Level', 'Lifetime Value'];
      const csvContent = [
        headers.join(','),
        ...customers.map(c => [
          c.name,
          c.email,
          c.churnProbability.toFixed(2),
          c.riskLevel,
          c.lifetimeValue
        ].join(','))
      ].join('\n');
      
      return new Blob([csvContent], { type: 'text/csv' });
    }
    
    return new Blob(['Mock Excel data'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  }
};