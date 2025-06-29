import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { apiService } from '../../services/api';
import { PredictionJob } from '../../types';

interface FileUploadProps {
  onUploadComplete: (job: PredictionJob) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadComplete }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploading(true);
    setUploadStatus('idle');

    try {
      const job = await apiService.uploadFile(file);
      setUploadStatus('success');
      onUploadComplete(job);
    } catch (error) {
      setUploadStatus('error');
    } finally {
      setUploading(false);
    }
  }, [onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    maxFiles: 1,
    disabled: uploading
  });

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-8"
    >
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Upload Customer Data</h2>
      
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
          isDragActive 
            ? 'border-blue-400 bg-blue-50' 
            : uploading
            ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
        }`}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center space-y-4">
          {uploading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"
            />
          ) : (
            <Upload className="w-12 h-12 text-gray-400" />
          )}
          
          <div>
            <p className="text-lg font-medium text-gray-900 mb-2">
              {uploading 
                ? 'Uploading...' 
                : isDragActive 
                ? 'Drop your file here' 
                : 'Upload customer data file'
              }
            </p>
            <p className="text-sm text-gray-500">
              Drag and drop your CSV or Excel file, or click to browse
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Supported formats: CSV, XLS, XLSX (Max 10MB)
            </p>
          </div>
        </div>
      </div>

      {uploadStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2"
        >
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-green-800">File uploaded successfully! Processing started.</span>
        </motion.div>
      )}

      {uploadStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2"
        >
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span className="text-red-800">Upload failed. Please try again.</span>
        </motion.div>
      )}

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2 flex items-center">
          <FileText className="w-4 h-4 mr-2" />
          Required CSV Format
        </h3>
        <p className="text-sm text-blue-800 mb-2">
          Your CSV file should include the following columns:
        </p>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• customer_id, name, email</li>
          <li>• tenure (months), monthly_charges, total_charges</li>
          <li>• contract_type, payment_method, internet_service</li>
          <li>• Additional features as needed for your model</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default FileUpload;