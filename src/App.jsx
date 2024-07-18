import { useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Component/Home'; 
import Landing from './Component/Landing';
import Addmovieplaying from './Dashbord/Addmovieplaying';
import Login from './Component/Login';
import Register from './Component/Register';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsBoundingBoxCircles } from 'react-icons/bs';
import Profile from './Component/Profile';
import MovieDetails from './Component/MovieDetails';
import TheaterList from './Component/TheaterList';
import SeatBooking from './Component/SeatBooking';



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
        }
              
      ]
    },
    {
      path:"/addmovieplaying",
      element:<Addmovieplaying/>
    },
    
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
