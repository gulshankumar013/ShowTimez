import React from 'react'
import Nav from './Nav'
import "../css/home.css"
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <>
    <Nav/>
    <Outlet/>
    </>
  )
}

export default Home
