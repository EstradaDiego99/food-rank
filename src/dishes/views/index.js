import React, { useState, useEffect } from "react";
import axios from "../../utils/customAxios";
import { handleError } from "../../utils/front-functions";
import Header from "../../hello/header";

import "./styles.css";

import DishCard from "./dishCard";
import RecommendationsCard from "./recomendationsCard";
import DishesFilter from "./_filter";

export default function DishShow() {
  const [dishes, setDishes] = useState();
  const [filteredDishes, setFilteredDishes] = useState();

  useEffect(() => {
    const fetchDishes = async () => {
      const resGet = await axios.get("/dishes/").catch((err) => err);
      if (resGet instanceof Error) {
        handleError(resGet);
        return;
      }
      console.log(resGet.data);
      setDishes(resGet.data);
    };
    fetchDishes();
  }, []);

  return (
    <>
      {" "}
      <Header></Header>
      <div className="arrange">
        <div className="filter"></div>

        <div className="left-col">
          <h2>DISHES</h2>
          <hr></hr>

          {dishes && (
            <DishesFilter
              dishes={dishes}
              setFilteredDishes={setFilteredDishes}
            />
          )}

          {filteredDishes ? (
            <div>
              {filteredDishes.map((dish) => {
                return (
                  <DishCard
                    id={dish._id}
                    elo={dish.elo}
                    tags={dish.tags}
                    restaurantId={dish.restaurantId}
                    name={dish.name}
                    price={dish.price}
                    currency={dish.currency}
                    photo={dish.photoUrl}
                    restaurant={dish.restaurant}
                  />
                );
              })}
            </div>
          ) : (
            <h3>No dishes found</h3>
          )}
        </div>

        <div className="right-col">
          <h2 className="secondary-font">OUR RECOMMENDATIONS FOR YOU</h2>
          <RecommendationsCard
            mealname="MEAL 1"
            photo
            recommended
            color="primary"
          />
          <RecommendationsCard mealname photo recommended color="secondary" />
          <RecommendationsCard mealname photo recommended color="brown" />
        </div>
      </div>
    </>
  );
}
