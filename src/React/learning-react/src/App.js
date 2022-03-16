import { useState } from "react";
import colorData from "./data/color-data.json";
import ColorList from "./components/ColorList.js";
import "./App.css";

// import StartRating from "./components/StarRating";

function App() {
  // return (
  //   <StartRating
  //     style={{ backgroundColor: "lightblue" }}
  //     onDoubleClick={(e) => console.log("double click")}
  //   />
  // );

  const [colors] = useState(colorData);
  return <ColorList colors={colors}></ColorList>;
}

export default App;
