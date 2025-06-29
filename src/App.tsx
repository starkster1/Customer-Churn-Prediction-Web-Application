import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, TrendingDown, DollarSign, AlertTriangle } from 'lucide-react';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import MetricCard from './components/Dashboard/MetricCard';
import ChurnTrendChart from './components/Dashboard/ChurnTrendChart';
import SegmentAnalysis from './components/Dashboard/SegmentAnalysis';
import FileUpload from './components/Upload/FileUpload';
import PredictionResults from './components/Predictions/PredictionResults';

import { apiService } from './services/api';
import { ChurnMetrics, Customer, PredictionJob } from './types';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [metrics, setMetrics] = useState<ChurnMetrics | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [predictionJobs, setPredictionJobs] = useState<PredictionJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      const [metricsData, customersData] = await Promise.all([
        apiService.getChurnMetrics(),
        apiService.getCustomers()
      ]);
      setMetrics(metricsData);
      setCustomers(customersData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (job: PredictionJob) => {
    setPredictionJobs(prev => [job, ...prev]);
    setActiveTab('predictions');
  };

  if (!user) {
    return <LoginForm />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full"
        />
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total Customers"
                value={metrics?.totalCustomers.toLocaleString() || '0'}
                change="+2.5% from last month"
                changeType="positive"
                icon={Users}
                color="bg-blue-500"
                index={0}
              />
              <MetricCard
                title="Churn Rate"
                value={`${((metrics?.churnRate || 0) * 100).toFixed(1)}%`}
                change="-0.3% from last month"
                changeType="positive"
                icon={TrendingDown}
                color="bg-red-500"
                index={1}
              />
              <MetricCard
                title="Avg Lifetime Value"
                value={`$${metrics?.avgLifetimeValue.toLocaleString() || '0'}`}
                change="+5.2% from last month"
                changeType="positive"
                icon={DollarSign}
                color="bg-green-500"
                index={2}
              />
              <MetricCard
                title="High Risk Customers"
                value={metrics?.highRiskCustomers.toLocaleString() || '0'}
                change="+1.8% from last month"
                changeType="negative"
                icon={AlertTriangle}
                color="bg-orange-500"
                index={3}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ChurnTrendChart data={metrics?.monthlyTrend || []} />
              <SegmentAnalysis data={metrics?.segmentAnalysis || []} />
            </div>
          </div>
        );

      case 'upload':
        return <FileUpload onUploadComplete={handleFileUpload} />;

      case 'predictions':
        return (
          <div className="space-y-6">
            {predictionJobs.length > 0 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Jobs</h2>
                <div className="space-y-3">
                  {predictionJobs.map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{job.fileName}</p>
                        <p className="text-sm text-gray-500">
                          {job.processedRecords}/{job.totalRecords} records processed
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        job.status === 'completed' ? 'bg-green-100 text-green-800' :
                        job.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                        job.status === 'failed' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {job.status}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            <PredictionResults customers={customers} />
          </div>
        );

      case 'customers':
        return <PredictionResults customers={customers} />;

      case 'reports':
        return (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Reports</h2>
            <p className="text-gray-600">Advanced reporting features coming soon...</p>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;