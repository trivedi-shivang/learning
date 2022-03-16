import React from "react";
import ReactDOM from "react-dom";
import Menu from "./manual-webpack-config/components/Menu";
import data from "./data/recipes.json";

ReactDOM.render(
  <Menu recipes={data} title="Delicious Recipes" />,
  document.getElementById("root")
);
