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
          path: "/admin/manageusers",
          element: <ManageUsers/>
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
