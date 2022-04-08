import Ingredient from "./Ingredient";
export default function IngredientsList({ list }) {
  <ul className="ingredients">
    {list.map((ingredient, i) => (
      <Ingredient key={i} {...ingredient}></Ingredient>
    ))}
  </ul>;
}
