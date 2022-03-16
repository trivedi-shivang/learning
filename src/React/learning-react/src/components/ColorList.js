import Color from "./Color.js";
export default function ColorList({ colors = [] }) {
  if (!colors.length) return <div>No Colors Listed.</div>;
  return (
    <div>
      {colors.map((color, i) => (
        <Color key={i} {...color}></Color>
      ))}
    </div>
  );
}
