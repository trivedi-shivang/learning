import { useState } from "react";
import Star from "./Star";

const createArray = (length) => [...Array(length)];

export default function StartRating({
  selectedStars = 0,
  style = {},
  onRate = (f) => f,
  totalStars = 5,
}) {
  // const [selectedStars, setSelectedStars] = useState(0); //default state-variable value and the function to modify the value
  return (
    <div style={{ padding: "5px", ...style }}>
      {createArray(totalStars).map((start, i) => (
        <Star
          key={i}
          selected={selectedStars > i}
          onSelect={() => onRate(i + 1)}
        ></Star>
      ))}
      <p>
        {selectedStars} out of {totalStars} stars
      </p>
    </div>
  );
}
