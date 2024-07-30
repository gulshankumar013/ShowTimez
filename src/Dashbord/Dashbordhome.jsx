import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import "../Dashbord/dashbordhome.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MovieChart from './MovieChart';

const Dashbordhome = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalMovies, setTotalMovies] = useState(0);
  const [totalUpcomingMovies, setTotalUpcomingMovies] = useState(0);
  const navigate = useNavigate();
  const token = sessionStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      console.log('No token found');
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    fetchTotalUsers();
    fetchTotalMovies();
    fetchTotalUpcomingMovies();
  }, []);

  const fetchTotalUsers = async () => {
    try {
      const response = await axios.post("http://localhost:5165/totaluser", { eventID: "1001" });
      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.rData && responseData.rData.total_users) {
          setTotalUsers(responseData.rData.total_users);
        } else {
          console.log("No users data in response");
        }
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchTotalMovies = async () => {
    try {
      const response = await axios.post("http://localhost:5165/totalmovieplaying", { eventID: "1001" });
      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.rData && responseData.rData.total_movie_playing) {
          setTotalMovies(responseData.rData.total_movie_playing);
        } else {
          console.log("No movies data in response");
        }
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchTotalUpcomingMovies = async () => {
    try {
      const response = await axios.post("http://localhost:5165/totalcommingplaying", { eventID: "1001" });
      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.rData && responseData.rData.total_coming_movie) {
          setTotalUpcomingMovies(responseData.rData.total_coming_movie);
        } else {
          console.log("No upcoming movies data in response");
        }
      }
    } catch (error) {
      console.error("Error fetching upcoming movies:", error);
    }
  };

  const data = [
    { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
  ];

  const pieData = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="dashboard-home">
      <h2>Dashboard</h2>
      <div className="cards">
        <div className="total-users-card">
          <div className="card-content">
            <h3>Total Users</h3>
            <p>{totalUsers}</p>
          </div>
        </div>
        <div className="total-movies-card">
          <div className="card-content">
            <h3>Total Movies Playing Now</h3>
            <p>{totalMovies}</p>
          </div>
        </div>
        <div className="total-upcoming-movies-card">
          <div className="card-content">
            <h3>Total Upcoming Movies</h3>
            <p>{totalUpcomingMovies}</p>
          </div>
        </div>
      </div>
      <div className="charts">
        <div className="chart-container">
          <MovieChart/>
        </div>

        <div className="chart-container">
          <h3>Line Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>Pie Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
            
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashbordhome;


// import React, { useEffect, useState } from 'react';
// import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
// import "../Dashbord/dashbordhome.css";
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Dashbordhome = () => {
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalMovies, setTotalMovies] = useState(0);
//   const [totalUpcomingMovies, setTotalUpcomingMovies] = useState(0);
//   const [pieData, setPieData] = useState([]);
//   const navigate = useNavigate();
//   const token = sessionStorage.getItem('adminToken');

//   useEffect(() => {
//     if (!token) {
//       console.log('No token found');
//       navigate('/login');
//     }
//   }, [token, navigate]);

//   useEffect(() => {
//     fetchTotalUsers();
//     fetchTotalMovies();
//     fetchTotalUpcomingMovies();
//     fetchMovieTicketDistribution();
//   }, []);

//   const fetchTotalUsers = async () => {
//     try {
//       const response = await axios.post("http://localhost:5165/totaluser", { eventID: "1001" });
//       if (response.status === 200) {
//         const responseData = response.data;
//         if (responseData.rData && responseData.rData.total_users) {
//           setTotalUsers(responseData.rData.total_users);
//         } else {
//           console.log("No users data in response");
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };

//   const fetchTotalMovies = async () => {
//     try {
//       const response = await axios.post("http://localhost:5165/totalmovieplaying", { eventID: "1001" });
//       if (response.status === 200) {
//         const responseData = response.data;
//         if (responseData.rData && responseData.rData.total_movie_playing) {
//           setTotalMovies(responseData.rData.total_movie_playing);
//         } else {
//           console.log("No movies data in response");
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching movies:", error);
//     }
//   };

//   const fetchTotalUpcomingMovies = async () => {
//     try {
//       const response = await axios.post("http://localhost:5165/totalcommingplaying", { eventID: "1001" });
//       if (response.status === 200) {
//         const responseData = response.data;
//         if (responseData.rData && responseData.rData.total_coming_movie) {
//           setTotalUpcomingMovies(responseData.rData.total_coming_movie);
//         } else {
//           console.log("No upcoming movies data in response");
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching upcoming movies:", error);
//     }
//   };

//   const fetchMovieTicketDistribution = async () => {
//     try {
//       const response = await axios.post("http://localhost:5165/getMovieTicketDistribution");
//       if (response.status === 200) {
//         const responseData = response.data;
//         if (responseData.rData && responseData.rData.movies) {
//           setPieData(responseData.rData.movies);
//         } else {
//           console.log("No movie booking data in response");
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching movie ticket distribution:", error);
//     }
//   };

//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

//   const data = [
//     { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
//     { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
//     { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
//     { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
//     { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
//     { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
//     { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
//   ];

//   return (
//     <div className="dashboard-home">
//       <h2>Dashboard</h2>
//       <div className="cards">
//         <div className="total-users-card">
//           <div className="card-content">
//             <h3>Total Users</h3>
//             <p>{totalUsers}</p>
//           </div>
//         </div>
//         <div className="total-movies-card">
//           <div className="card-content">
//             <h3>Total Movies Playing Now</h3>
//             <p>{totalMovies}</p>
//           </div>
//         </div>
//         <div className="total-upcoming-movies-card">
//           <div className="card-content">
//             <h3>Total Upcoming Movies</h3>
//             <p>{totalUpcomingMovies}</p>
//           </div>
//         </div>
//       </div>
//       <div className="charts">
//         <div className="chart-container">
//           <h3>Bar Chart</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={data}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="pv" fill="#8884d8" />
//               <Bar dataKey="uv" fill="#82ca9d" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="chart-container">
//           <h3>Line Chart</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={data}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
//               <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="chart-container">
//           <h3>Pie Chart</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={pieData}
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={80}
//                 fill="#8884d8"
//                 dataKey="ticket_count"
//                 label
//               >
//                 {pieData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashbordhome;
