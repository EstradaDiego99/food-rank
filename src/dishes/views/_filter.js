import React, { useState, useEffect } from "react";

import Tags from "../../shared/tags";
import { useFormState } from "../../utils/customStates";
import { stringsMatch } from "../../utils/front-functions";

export default function DishesFilter({ dishes, setFilteredDishes }) {
  const [dishName, setDishName] = useState("");
  const [restName, setRestName] = useState("");
  const tags = useFormState("");

  useEffect(() => {
    const filteredDishes = dishes.filter((dish) => {
      if (!stringsMatch(dish.name, dishName)) return false;
      if (!stringsMatch(dish.restaurant.name, restName)) return false;
      for (const tag of tags.val) {
        if (!dish.tags.includes(tag)) return false;
      }
      return true;
    });
    console.log(filteredDishes);
    setFilteredDishes(filteredDishes);
  }, [dishName, restName, tags.val]);

  return (
    <form className="card p-2">
      <p>Search:</p>

      <div className="form-group">
        <input
          type="text"
          autoComplete="nope"
          className="form-control"
          value={dishName}
          placeholder="Dish Name:"
          onChange={(e) => setDishName(e.target.value)}
        />
        <label className="form-label">Dish name:</label>
      </div>

      <div className="form-group">
        <input
          type="text"
          autoComplete="nope"
          className="form-control"
          value={restName}
          placeholder="Restaurant name:"
          onChange={(e) => setRestName(e.target.value)}
        />
        <label className="form-label">Restaurant name:</label>
      </div>

      <Tags tags={tags} editMode={true} />
    </form>
  );
}
