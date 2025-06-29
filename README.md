# Customer Churn Prediction Web Application

A modern, enterprise-grade web application designed to help companies predict and analyze customer churn using machine learning. Built with React, TypeScript, and Tailwind CSS, this application provides an intuitive interface for data scientists, analysts, and business stakeholders to upload customer data, generate predictions, and visualize insights.

## 🚀 Features

### 🔐 Secure Authentication
- Role-based access control (Admin, Analyst, Viewer)
- Secure login system with session management
- User profile management

### 📊 Interactive Dashboard
- Real-time key performance indicators (KPIs)
- Customer churn rate tracking
- Average customer lifetime value analysis
- High-risk customer identification
- Monthly trend visualization
- Customer segment analysis

### 📁 Data Management
- Drag-and-drop file upload (CSV, Excel)
- File validation and format checking
- Batch processing with progress tracking
- Data quality indicators

### 🎯 Prediction Engine Integration
- Seamless ML model integration
- Real-time prediction processing
- Batch prediction capabilities
- Prediction confidence scoring

### 📈 Advanced Analytics
- Interactive data tables with sorting and filtering
- Visual risk indicators
- Exportable reports (CSV, Excel)
- Customer segmentation analysis
- Retention trend analysis

### 🎨 Modern User Experience
- Responsive design for all devices
- Smooth animations and micro-interactions
- Intuitive navigation
- Professional enterprise UI

## 📸 Application Screenshots

### Login Screen
*Add screenshot of the login interface here*
![Login Screen](./screenshots/login.png)

### Dashboard Overview
*Add screenshot of the main dashboard with metrics and charts*
![Dashboard](./screenshots/dashboard.png)

### Data Upload Interface
*Add screenshot of the file upload section*
![Data Upload](./screenshots/upload.png)

### Prediction Results
*Add screenshot of the prediction results table*
![Prediction Results](./screenshots/predictions.png)

### Customer Analytics
*Add screenshot of the customer analysis section*
![Customer Analytics](./screenshots/analytics.png)

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **File Upload**: React Dropzone
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 16.0 or higher)
- **npm** (version 7.0 or higher)
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd churn-prediction-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open in Browser
Navigate to `http://localhost:5173` in your web browser.

### 5. Login with Demo Credentials
- **Email**: admin@company.com
- **Password**: admin123

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Auth/            # Authentication components
│   ├── Dashboard/       # Dashboard widgets and charts
│   ├── Layout/          # Layout components (Header, Sidebar)
│   ├── Predictions/     # Prediction results components
│   └── Upload/          # File upload components
├── contexts/            # React context providers
├── services/            # API services and utilities
├── types/               # TypeScript type definitions
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:8000/api
VITE_ML_MODEL_ENDPOINT=http://localhost:5000/predict

# Authentication
VITE_JWT_SECRET=your-jwt-secret-key

# File Upload
VITE_MAX_FILE_SIZE=10485760  # 10MB in bytes
VITE_ALLOWED_FILE_TYPES=.csv,.xlsx,.xls
```

### API Integration
The application is designed to integrate with your machine learning model API. Update the `src/services/api.ts` file to connect to your actual endpoints:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiService = {
  // Replace mock implementations with actual API calls
  async uploadFile(file: File): Promise<PredictionJob> {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
    
    return response.json();
  },
  
  // Add other API methods...
};
```

## 📊 Data Format Requirements

### CSV Upload Format
Your CSV files should include the following columns:

| Column Name | Type | Description |
|-------------|------|-------------|
| customer_id | String | Unique customer identifier |
| name | String | Customer full name |
| email | String | Customer email address |
| tenure | Number | Months as customer |
| monthly_charges | Number | Monthly subscription fee |
| total_charges | Number | Total amount paid |
| contract_type | String | Contract type (Month-to-month, One year, Two year) |
| payment_method | String | Payment method used |
| internet_service | String | Internet service type |

### Example CSV Structure
```csv
customer_id,name,email,tenure,monthly_charges,total_charges,contract_type,payment_method,internet_service
CUST001,John Smith,john.smith@email.com,24,89.99,2159.76,Two year,Credit card,Fiber optic
CUST002,Emily Davis,emily.davis@email.com,36,65.50,2358.00,One year,Bank transfer,DSL
```

## 🔌 ML Model Integration

### API Endpoints Expected
Your machine learning model should expose the following endpoints:

#### POST /predict
```json
{
  "data": [
    {
      "customer_id": "CUST001",
      "tenure": 24,
      "monthly_charges": 89.99,
      // ... other features
    }
  ]
}
```

#### Response Format
```json
{
  "predictions": [
    {
      "customer_id": "CUST001",
      "churn_probability": 0.85,
      "risk_level": "high",
      "confidence": 0.92
    }
  ]
}
```

## 🧪 Testing

### Run Tests
```bash
npm run test
```

### Run Linting
```bash
npm run lint
```

### Type Checking
```bash
npm run type-check
```

## 🏗️ Building for Production

### Create Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📈 Performance Optimization

- **Code Splitting**: Components are lazy-loaded for optimal performance
- **Image Optimization**: All images are optimized and served in modern formats
- **Bundle Analysis**: Use `npm run analyze` to analyze bundle size
- **Caching**: Proper caching headers for static assets

## 🔒 Security Features

- **Input Validation**: All user inputs are validated and sanitized
- **File Upload Security**: File type and size validation
- **Authentication**: Secure JWT-based authentication
- **CORS Protection**: Proper CORS configuration
- **XSS Protection**: Content Security Policy headers

## 🚀 Deployment

### Deploy to Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure environment variables in Netlify dashboard

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel --prod`
3. Configure environment variables in Vercel dashboard

### Deploy to AWS S3 + CloudFront
1. Build the project: `npm run build`
2. Upload `dist` folder to S3 bucket
3. Configure CloudFront distribution
4. Set up proper CORS and security headers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- **Email**: support@yourcompany.com
- **Documentation**: [Link to detailed docs]
- **Issue Tracker**: [GitHub Issues URL]

## 🔄 Changelog

### Version 1.0.0 (Current)
- Initial release
- Authentication system
- Dashboard with key metrics
- File upload functionality
- Prediction results display
- Export capabilities

### Planned Features
- [ ] Advanced filtering options
- [ ] Real-time notifications
- [ ] A/B testing for retention strategies
- [ ] Advanced reporting and insights
- [ ] Mobile app companion
- [ ] API rate limiting and monitoring

## 🏢 Enterprise Features

This application is designed for enterprise use with:

- **Scalability**: Handles large datasets efficiently
- **Security**: Enterprise-grade security measures
- **Compliance**: GDPR and data privacy compliant
- **Integration**: Easy integration with existing systems
- **Support**: Professional support available
- **Customization**: Highly customizable for specific needs

---

**Built with ❤️ for data-driven customer retention strategies**
