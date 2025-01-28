import { useState } from "react";
import useHabitStore from "../store/useStorehabit";

export default function AddHabitModal({ onClose }) {
  const [habitName, setHabitName] = useState("");
  const addHabit = useHabitStore((state) => state.addHabit);

  const handleSave = () => {
    if (habitName.trim()) {
      addHabit(habitName);
      setHabitName("");
      onClose();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          width: "300px",
        }}
      >
        <h3>Add New Habit</h3>
        <input
          type="text"
          value={habitName}
          onChange={(e) => setHabitName(e.target.value)}
          placeholder="Habit Name"
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <button onClick={handleSave} style={{ marginRight: "10px" }}>
          Save
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
