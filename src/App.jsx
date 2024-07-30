import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Component/Home'; 
import Landing from './Component/Landing';
import Addmovieplaying from './Dashbord/Addmovieplaying';
import Login from './Component/Login';
import Register from './Component/Register';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './Component/Profile';
import MovieDetails from './Component/MovieDetails';
import TheaterList from './Component/TheaterList';
import SeatBooking from './Component/SeatBooking';
import ContactUs from './Component/ContactUs';
import MyBookings from './Component/MyBookings';
import Dashbordhome from './Dashbord/Dashbordhome';
import AdminLayout from './Dashbord/AdminLayout';
import ManageUsers from './Dashbord/ManageUsers';
import ProfilePanel from './Dashbord/ProfilePanel';
import Massage from './Dashbord/Massage';
import AboutUs from './Component/AboutUs';
import Movieplaying from './Dashbord/Movieplaying';
import AdminLogout from './Dashbord/AdminLogout';
import UpcommingMovie from './Dashbord/UpcommingMovie';
import AddComingMovie from './Dashbord/AddComingMovie';
import TicketBooked from './Dashbord/TicketBooked';
import { Chart } from 'chart.js';
import MovieChart from './Dashbord/MovieChart';
import Giftcard from './Component/Giftcard';
import VerifyEmail from './Component/VerifyEmail';





const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/",
          element: <Landing />
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/register",
          element:<Register/>
        },
        {
          path:"/profile",
          element:<Profile/>
        },
        {
          path:"/moviedetails",
          element:<MovieDetails/>
        },
        {
          path:"/theaterList",
          element:<TheaterList/>
        },
        {
          path:"/seatbooking",
          element:<SeatBooking/>
        },
        {
          path:"/contactus",
          element:<ContactUs/>
        },
        {
          path:"/mybooking",
          element:<MyBookings/>
        },
        {
          path:"/aboutus",
          element:<AboutUs/>
        },
        {
          path:"/giftcard",
          element:<Giftcard/>
        },
        {
          path:"/verifyemail",
          element:<VerifyEmail/>
        }
       
              
      ]
    },
    {
      path: "/admin",
      element: <AdminLayout/>,
      children: [
        {
          path: "/admin",
          element: <Dashbordhome/>
        },
        {
          path: "/admin/addmovieplaying",
          element: <Addmovieplaying/>
        },
        {
          path:"/admin/addcommingmovie",
          element:<AddComingMovie/>
        },
        {
          path:"/admin/upcommingmovie",
          element:<UpcommingMovie/>
        },
        {
          path: "/admin/manageusers",
          element: <ManageUsers/>
        },
        {
          path:"/admin/messgae",
          element:<Massage/>
        },
        {
          path:"/admin/movieplaying",
          element:<Movieplaying/>
        },
        {
          path:"/admin/adminlogout",
          element:<AdminLogout/>
        },
        {
          path:"/admin/ticketbooked",
          element:<TicketBooked/>
        },
        {
          path:"/admin/chart",
          element:<Chart/>
        },
        {
          path:"/admin/moviechart",
          element:<MovieChart/>
        }
        
      ]
    },
    {
      path:"/adminprofilepanel",
      element:<ProfilePanel/>
    }

    
  ]);

  return (
    <>
    <RouterProvider router={router} />
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
/>
    </>
  );
}

export default App;
