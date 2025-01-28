import useHabitStore from "../store/useStorehabit";

export default function HabitList() {
  const { habits, toggleHabit, deleteHabit } = useHabitStore();

  return (
    <div style={{ padding: "20px" }}>
      {habits.map((habit) => (
        <div
          key={habit.id}
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            justifyContent: "space-between",
          }}
        >
          <div>
            <input
              type="checkbox"
              checked={habit.completed}
              onChange={() => toggleHabit(habit.id)}
            />
            <span
              style={{
                marginLeft: "10px",
                textDecoration: habit.completed ? "line-through" : "none",
              }}
            >
              {habit.name}
            </span>
          </div>
          <button
            style={{ color: "red", border: "none", background: "transparent" }}
            onClick={() => deleteHabit(habit.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
