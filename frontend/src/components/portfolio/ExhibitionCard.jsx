import React, { useState } from "react";
import { Col, Modal, Button } from "react-bootstrap";
import ex from "../../assets/img/ex.avif";

export const ExhibitionCard = ({
  exhibitionName,
  exhibitionLocation,
  exhibitionTheme,
  startDate,
  endDate,
  exhibitionDescription,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Format dates if needed
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <>
      {/* Project Box */}
      <Col size={12} sm={6} md={4}>
        <div
          className="proj-imgbx"
          onClick={handleShow}
          style={{ cursor: "pointer" }}
        >
          <img src={ex} alt={exhibitionName} />
          <div className="proj-txtx">
            <h4>{exhibitionName}</h4>
            <span>{exhibitionTheme}</span>
          </div>
        </div>
      </Col>

      {/* Styled Modal */}
      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="lg"
        className="project-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>{exhibitionName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Theme Section */}
          <div className="modal-section">
            <h5 className="modal-section-title">Theme</h5>
            <p>{exhibitionTheme}</p>
          </div>

          {/* Description Section */}
          <div className="modal-section">
            <h5 className="modal-section-title">Description</h5>
            <p>{exhibitionDescription}</p>
          </div>

          {/* Location Section */}
          <div className="modal-section">
            <h5 className="modal-section-title">Location</h5>
            <p>{exhibitionLocation}</p>
          </div>

          {/* Dates Section */}
          <div className="modal-section">
            <h5 className="modal-section-title">Dates</h5>
            <p>
              {formatDate(startDate)} - {formatDate(endDate)}
            </p>
          </div>
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
