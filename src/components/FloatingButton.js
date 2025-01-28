import { FaPlus } from "react-icons/fa";

export default function FloatingButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#6200ea",
        color: "#fff",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        border: "none",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
      }}
    >
      <FaPlus size={24} />
    </button>
  );
}
