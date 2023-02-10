import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addLead } from "state/ducks/lead/actions";
import Loader from "./Loader";
import Message from "./Message";
import * as types from "state/ducks/lead/types";

const LeadCapture = ({ details }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(details.leadCapture);
  const [showMore, setShowMore] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    notes: "",
  });
  const { success, error, loading } = useSelector((state) => state.lead);
  navigator.geolocation.getCurrentPosition(function (position) {
    setForm({
      ...form,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  });
  useEffect(() => {
    if (success) {
      dispatch({ type: types.LEAD_RESET });
      setShow(false);
    }
  }, [success, form, dispatch, details]);
  const handleClose = () => {
    setShow(false);
  };

  const handleAddLead = (e) => {
    e.preventDefault();
    dispatch(addLead({ ...form, user: details.id }));
  };
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="text-center"
      >
        <Modal.Header closeButton onHide={handleClose}>
          <h5 className="m-auto">
            Share your info with {details.personal.name}
          </h5>
        </Modal.Header>
        <Modal.Body>
          {error && <Message variant="danger">{error}</Message>}

          <Form onSubmit={handleAddLead}>
            <Form.Group controlId="name">
              <Form.Control
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Control
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="phone">
              <Form.Control
                type="text"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              ></Form.Control>
            </Form.Group>
            {showMore ? (
              <>
                <Form.Group controlId="jobTitle">
                  <Form.Control
                    type="text"
                    placeholder="Job Title"
                    value={form.jobTitle}
                    onChange={(e) =>
                      setForm({ ...form, jobTitle: e.target.value })
                    }
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="company">
                  <Form.Control
                    type="text"
                    placeholder="Company"
                    value={form.company}
                    onChange={(e) =>
                      setForm({ ...form, company: e.target.value })
                    }
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="notes">
                  <Form.Control
                    type="text"
                    placeholder="Message"
                    value={form.notes}
                    onChange={(e) =>
                      setForm({ ...form, notes: e.target.value })
                    }
                  ></Form.Control>
                </Form.Group>
              </>
            ) : (
              <Form.Group controlId="add" className="text-left">
                <Button
                  variant="light"
                  onClick={(e) => {
                    setShowMore(true);
                  }}
                >
                  + ADD MORE
                </Button>
              </Form.Group>
            )}

            <Button type="submit" variant="primary">
              {loading ? <Loader /> : <>Continue</>}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <p className="m-auto">Uniti will not sell or share your details</p>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LeadCapture;
