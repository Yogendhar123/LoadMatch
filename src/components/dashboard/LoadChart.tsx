import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Load } from '../../types';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LoadChartProps {
  data: Load[];
  period: 'week' | 'month' | 'quarter';
  type: 'loader' | 'receiver';
}

const LoadChart = ({ data, period, type }: LoadChartProps) => {
  // Generate date labels based on the selected period
  const generateDateLabels = () => {
    const today = new Date();
    const labels: string[] = [];
    let days: number;
    
    switch (period) {
      case 'week':
        days = 7;
        break;
      case 'month':
        days = 30;
        break;
      case 'quarter':
        days = 90;
        break;
      default:
        days = 7;
    }
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      labels.push(new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date));
    }
    
    return labels;
  };
  
  // Count loads by status and date
  const countLoadsByDate = () => {
    const labels = generateDateLabels();
    const pendingCounts = new Array(labels.length).fill(0);
    const assignedCounts = new Array(labels.length).fill(0);
    const inTransitCounts = new Array(labels.length).fill(0);
    const deliveredCounts = new Array(labels.length).fill(0);
    
    // Number of days to look back
    let daysToLookBack: number;
    switch (period) {
      case 'week':
        daysToLookBack = 7;
        break;
      case 'month':
        daysToLookBack = 30;
        break;
      case 'quarter':
        daysToLookBack = 90;
        break;
      default:
        daysToLookBack = 7;
    }
    
    // Get the start date (days ago)
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - daysToLookBack);
    startDate.setHours(0, 0, 0, 0);
    
    // Count loads by date and status
    data.forEach(load => {
      const loadDate = new Date(load.createdAt);
      
      // Skip if the load is older than the start date
      if (loadDate < startDate) return;
      
      // Calculate the index in the array
      const daysDiff = Math.floor((new Date().getTime() - loadDate.getTime()) / (1000 * 60 * 60 * 24));
      const index = labels.length - 1 - daysDiff;
      
      if (index >= 0 && index < labels.length) {
        switch (load.status) {
          case 'pending':
            pendingCounts[index]++;
            break;
          case 'assigned':
            assignedCounts[index]++;
            break;
          case 'in-transit':
            inTransitCounts[index]++;
            break;
          case 'delivered':
            deliveredCounts[index]++;
            break;
        }
      }
    });
    
    return {
      labels,
      pendingCounts,
      assignedCounts,
      inTransitCounts,
      deliveredCounts,
    };
  };
  
  const { labels, pendingCounts, assignedCounts, inTransitCounts, deliveredCounts } = countLoadsByDate();
  
  // Create chart data based on user type
  const chartData = {
    labels,
    datasets: type === 'loader' 
      ? [
          {
            label: 'Pending',
            data: pendingCounts,
            borderColor: '#FBBF24', // yellow-400
            backgroundColor: 'rgba(251, 191, 36, 0.5)',
            tension: 0.3,
          },
          {
            label: 'Assigned',
            data: assignedCounts,
            borderColor: '#3B82F6', // blue-500
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            tension: 0.3,
          },
          {
            label: 'In Transit',
            data: inTransitCounts,
            borderColor: '#8B5CF6', // purple-500
            backgroundColor: 'rgba(139, 92, 246, 0.5)',
            tension: 0.3,
          },
          {
            label: 'Delivered',
            data: deliveredCounts,
            borderColor: '#10B981', // green-500
            backgroundColor: 'rgba(16, 185, 129, 0.5)',
            tension: 0.3,
          },
        ]
      : [
          {
            label: 'Assigned',
            data: assignedCounts,
            borderColor: '#3B82F6', // blue-500
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            tension: 0.3,
          },
          {
            label: 'In Transit',
            data: inTransitCounts,
            borderColor: '#8B5CF6', // purple-500
            backgroundColor: 'rgba(139, 92, 246, 0.5)',
            tension: 0.3,
          },
          {
            label: 'Delivered',
            data: deliveredCounts,
            borderColor: '#10B981', // green-500
            backgroundColor: 'rgba(16, 185, 129, 0.5)',
            tension: 0.3,
          },
        ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };
  
  return <Line data={chartData} options={options} />;
};

export default LoadChart;