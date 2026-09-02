import { useState } from 'react'
import { Route, Routes, Navigate } from "react-router-dom";
import NavBar from './portfolio/NavBar.jsx' 
import Banner from './portfolio/Banner.jsx'
import Skills from './portfolio/Skills.jsx'
import Project from './portfolio/Projects.jsx'
import Contact from './portfolio/Contact.jsx'
import Qualification from './portfolio/Qualification.jsx'
import Divers from './portfolio/Divers.jsx'
import '../styles/Portfolio.css';




function Portfolio() {

  return (
    <>
    <div className="Portfolio">
      <NavBar/>
      <Banner/> 
      <Skills/>
      <Project/>
      <Qualification/>
      <Divers/>
      <Contact/>
      </div>
    </>
    
  )
}

export default Portfolio

