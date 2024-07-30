import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../Dashbord/MovieChart.css';

// Register components required for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MovieChart = () => {
  const [movieData, setMovieData] = useState({ names: [], counts: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5165/totalMoviesCount', { eventID: '1001' });
        const data = response.data;

        if (data.rData) {
          setMovieData({
            names: data.rData.movie_names || [],
            counts: data.rData.movie_counts || []
          });
        } else {
          setError('No data received');
        }
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: movieData.names,
    datasets: [
      {
        label: 'Number of Bookings',
        data: movieData.counts,
        backgroundColor: (context) => {
          const index = context.dataIndex;
          const colors = [
            '#FF6385', '#36A2EB', '#FFCE56', '#FF9F40',
            '#FF6385', '#36A2EB', '#FFCE56', '#FF9F40',
            '#00CED1', '#FFD700'
          ];
          return colors[index % colors.length];
        },
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderWidth: 0
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw} bookings`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#333',
          font: {
            size: 12
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        }
      },
      y: {
        ticks: {
          color: '#333',
          font: {
            size: 12
          },
          // Custom y-axis labels
          callback: function(value) {
            // Display labels in desired format, e.g., 1, 2, 3, 4, 5
            return value;
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        // Define minimum and maximum values for y-axis
        min: 0,
        max: Math.max(...movieData.counts) + 1 // Adjust as needed
      }
    }
  };

  return (
    <div className="movie-chart-container">
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <div className="chart">
          <h2 className="movie-chart-header">Movie Booking Counts</h2>
          <Bar data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default MovieChart;
