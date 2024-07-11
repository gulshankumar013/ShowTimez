import { useState } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Component/Home'; 
import Landing from './Component/Landing';
import Addmovieplaying from './Dashbord/Addmovieplaying';

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/",
          element: <Landing />
        }
      ]
    },
    {
      path:"/addmovieplaying",
      element:<Addmovieplaying/>
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
