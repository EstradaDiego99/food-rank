import React, { useState, useEffect, useContext } from "react";
import axios from "../../utils/customAxios";
import { handleError, toQueryString } from "../../utils/front-functions";
import Header from "../../hello/header";
import { UserContext } from "../../utils/context";

import "../../dishes/views/styles.css";
import DishCard from "../../dishes/views/dishCard";

export default function ProfileRecommendations() {
  const [dishes, setDishes] = useState();
  const accessToken = useContext(UserContext);

  useEffect(() => {
    const fetchDishes = async () => {
      const resGet = await axios
        .get(
          `/users/recommendedDishes?${toQueryString({ token: accessToken })}`
        )
        .catch((err) => err);

      if (resGet instanceof Error) {
        handleError(resGet);
        return;
      }
      setDishes(resGet.data);
    };
    fetchDishes();
  }, []);

  if (!dishes) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {" "}
      <Header></Header>
      <div className="arrange">
        <div className="filter"></div>

        <div className="left-col">
          <h2>RECOMMENDATIONS FOR YOU</h2>
          <hr></hr>

          {dishes && dishes.length > 0 ? (
            <div>
              {dishes.map((dish) => (
                <DishCard
                  key={dish._id}
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
              ))}
            </div>
          ) : (
            <div>
              <h3>
                Looks like you have visited every place possible! Good to go!
                Come back soon, we'll have more recommendations for you to try
                ;)
              </h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
