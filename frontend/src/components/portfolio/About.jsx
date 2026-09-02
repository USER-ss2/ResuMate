import React, {useState} from "react";
import {  Fade } from "react-bootstrap";
import CV from "../../assets/John-Cv.pdf";
import 'animate.css'



const About = () => {
    
    

      return (
        <section className="about-me">
            
          <div className="about-content animate__animated animate__fadeInLeft">
            <h1>About Me</h1>
            <p>I like creating a cool design project.</p>
            <button className="download-btn">Download CV</button>
            <div className="color-dots">
              <div className="dot purple"></div>
              <div className="dot gradient"></div>
              <div className="dot blue"></div>
            </div>
          </div>
    
          <div className="about-text animate__animated animate__fadeInRight">
            <p>
              Vestibulum vitae lorem tellus nec dui dictum lorem viverra ac, place
              uilm rat Lorse ipsum uilme umes acdictm Vesti itae lorem tellus nec
              dui dictum lorem viverra a eros ac, pl rat Lorse ipsum lorimes aul
              erdum. erdum.
            </p>
            <div className="signature">Your Signature</div>
          </div>
        </section>
      );
    };
    

    
    
    

export default About;
