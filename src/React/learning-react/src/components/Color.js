import StarRating from "./StarRating.js";
import { FaTrash } from "react-icons/fa";
export default function Color({
  id,
  title,
  color,
  rating,
  onRate = (f) => f,
  onRemove = (f) => f,
}) {
  return (
    <section>
      <h1>{title}</h1>
      <button onClick={() => onRemove(id)}>
        <FaTrash />
      </button>
      <div style={{ height: 50, backgroundColor: color }}></div>
      <StarRating
        selectedStars={rating}
        onRate={(rating) => onRate(id, rating)}
      ></StarRating>
    </section>
  );
}
