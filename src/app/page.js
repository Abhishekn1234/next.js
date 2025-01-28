
"use client";

import { useState } from "react";
import {
  Navbar,
  Container,
  Card,
  Button,
  Form,
  Modal,
  ProgressBar,
} from "react-bootstrap";
import { CheckCircle } from "react-bootstrap-icons";
import useHabitStore from "../store/useStorehabit";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitGoal, setNewHabitGoal] = useState("");
  const [newHabitType, setNewHabitType] = useState("");
  const [newHabitPeriod, setNewHabitPeriod] = useState("");
  const [checkedHabits, setCheckedHabits] = useState({});
  const habits = useHabitStore((state) => state.habits);
  const addHabit = useHabitStore((state) => state.addHabit);

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleConfirmation = () => setIsConfirmationOpen(!isConfirmationOpen);

  const handleAddHabit = () => {
    if (newHabitName && newHabitGoal && newHabitType && newHabitPeriod) {
      addHabit({
        name: newHabitName,
        goal: newHabitGoal,
        type: newHabitType,
        period: newHabitPeriod,
      });
      setNewHabitName("");
      setNewHabitGoal("");
      setNewHabitType("");
      setNewHabitPeriod("");
      toggleModal();
      toggleConfirmation();
    }
  };

  const handleCheckboxChange = (index) => {
    setCheckedHabits((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const checkedCount = Object.values(checkedHabits).filter(Boolean).length;
  const totalHabits = habits.length;
  const progress = totalHabits ? (checkedCount / totalHabits) * 100 : 0;

  return (
    <div>
      {/* Navbar */}
      <Navbar bg="light" expand="lg" className="mb-3">
        <Container>
          <Navbar.Brand href="#">Habit Tracker</Navbar.Brand>
        </Container>
      </Navbar>

      {/* Progress Bar */}
      <Container className="mb-3">
        <h4 className="text-center">Today's Progress</h4>
        <ProgressBar now={progress} label={`${Math.round(progress)}%`} />
        <p className="text-center mt-2">
          {checkedCount} of {totalHabits} habits completed today!
        </p>
       
      </Container>

      {/* Habits List */}
      <Container>
        <h3 className="mb-3">Today's Habits</h3>
        {habits.map((habit, index) => (
          <Card
            key={index}
            className={`mb-2 ${
              checkedHabits[index]
                ? "bg-danger text-white"
                : "bg-light text-dark"
            }`}
          >
            <Card.Body className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Text className="m-0">
                  <strong>Habit:</strong> {habit.name}
                </Card.Text>
                <Card.Text className="m-0">
                  <strong>Goal:</strong> {habit.goal}
                </Card.Text>
                <Card.Text className="m-0">
                  <strong>Type:</strong> {habit.type}
                </Card.Text>
                <Card.Text className="m-0">
                  <strong>Period:</strong> {habit.period}
                </Card.Text>
              </div>
              <Form.Check
                type="checkbox"
                id={`habit-${index}`}
                className="ms-auto"
                checked={!!checkedHabits[index]}
                onChange={() => handleCheckboxChange(index)}
              />
            </Card.Body>
          </Card>
        ))}
      </Container>

      {/* Floating Button */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
        }}
      >
        <Button
          variant="success"
          className="rounded-circle"
          style={{ width: "60px", height: "60px" }}
          onClick={toggleModal}
        >
          +
        </Button>
      </div>

      {/* Add Habit Modal */}
      <Modal show={isModalOpen} onHide={toggleModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create New Habit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Habit Name</Form.Label>
              <Form.Control
                type="text"
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Your Goal</Form.Label>
              <Form.Control
                type="text"
                value={newHabitGoal}
                onChange={(e) => setNewHabitGoal(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Habit Type</Form.Label>
              <Form.Select
                value={newHabitType}
                onChange={(e) => setNewHabitType(e.target.value)}
              >
                <option value="">Select a type</option>
                <option value="Everyday">Everyday</option>
                <option value="Weekly">Weekly</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Period</Form.Label>
              <Form.Select
                value={newHabitPeriod}
                onChange={(e) => setNewHabitPeriod(e.target.value)}
              >
                <option value="">Select a period</option>
                <option value="1 month">1 Month</option>
                <option value="2 months">2 Months</option>
                <option value="3 months">3 Months</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAddHabit}>
            Create New
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Confirmation Modal */}
      <Modal show={isConfirmationOpen} onHide={toggleConfirmation} centered>
        <Modal.Body className="text-center">
          <CheckCircle
            size={80}
            className="text-success mb-3"
            style={{ marginBottom: "20px" }}
          />
          <h4>Done!</h4>
          <p>New Habit has been added!</p>
          <Button variant="success" onClick={toggleConfirmation}>
            OK
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
