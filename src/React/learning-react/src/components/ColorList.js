import { useContext } from "react";
import Color from "./Color.js";
import { ColorContext } from "../index.js";
export default function ColorList({
  onRemoveColor = (f) => f,
  onRateColor = (f) => f,
}) {
  const { colors } = useContext(ColorContext);
  if (!colors.length) return <div>No Colors Listed.</div>;
  return (
    <div>
      {colors.map((color, i) => (
        <Color
          key={i}
          {...color}
          onRemove={onRemoveColor}
          onRate={onRateColor}
        ></Color>
      ))}
    </div>
  );
}
