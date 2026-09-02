import React, { useState } from "react";
import { Col, Modal, Button } from "react-bootstrap";
import img from '../../assets/img/project-img2.png'

export const ProjectCard = ({
  
        projectName,
        projectDescription,
        technologiesUsed,
        startDate,
        endDate,
        ongoing
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Project Box */}
      <Col size={12} sm={6} md={4}>
        <div
          className="proj-imgbx"
          onClick={handleShow}
          style={{ cursor: "pointer" }}

        >
          <img src= {img} alt={projectName} />
          <div className="proj-txtx">
            <h4>{projectName}</h4>
            <span>{projectDescription}</span>
          </div>
        </div>
      </Col>

      
      {/* Styled Modal */}
      <Modal show={show} onHide={handleClose} centered size="lg" className="project-modal">
        <Modal.Header closeButton>
          <Modal.Title>{projectName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Description Section */}
          <div className="modal-section">
            <h5 className="modal-section-title">Description</h5>
            <p>{projectDescription}</p>
          </div>

          {/* Technologies Section */}
          <div className="modal-section">
            <h5 className="modal-section-title">Technologies Used</h5>
            <ul className="technologies-list">
              {technologiesUsed.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </div>

          <span className="timeline__date">
                    {startDate.startMonthProject} / {startDate.startYearProject} -{" "}
                    {endDate.endMonthProject} / {endDate.endYearProject}
                  </span>

          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};