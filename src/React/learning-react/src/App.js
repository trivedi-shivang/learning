import { useState } from "react";
import colorData from "./data/color-data.json";
import ColorList from "./components/ColorList.js";
import "./App.css";
import AddColorForm from "./components/AddColorForm";
import { v4 } from "uuid";

// import StartRating from "./components/StarRating";

function App() {
  // return (
  //   <StartRating
  //     style={{ backgroundColor: "lightblue" }}
  //     onDoubleClick={(e) => console.log("double click")}
  //   />
  // );

  const [colors, setColors] = useState(colorData);
  return (
    <>
      <AddColorForm
        onNewColor={(title, color) =>
          setColors(
            colors.concat({
              id: v4(),
              rating: 0,
              title,
              color,
            })
          )
        }
      />
      <ColorList
        onRemoveColor={(id) => {
          const newColors = colors.filter((color) => color.id !== id);
          setColors(newColors);
        }}
        onRateColor={(id, rating) => {
          const newColors = colors.map((color) => {
            if (color.id === id) {
              return { ...color, rating };
            } else {
              return color;
            }
          });
          setColors(newColors);
        }}
      ></ColorList>
    </>
  );
}

export default App;
