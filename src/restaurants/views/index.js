import React, { useState, useEffect } from "react";
import axios from "../../utils/customAxios";
import { handleError } from "../../utils/front-functions";

import RestaurantCard from "./restaurantCard";
import RecommendationsCard from "./recomendationsCard";

import "./styles.css";

export default function RestaurantShow() {
  const [restaurants, setRestaurants] = useState();

  useEffect(() => {
    const fetchRestaurants = async()=>{
      const resGet = await axios.get('/restaurants/').catch((err) => err);
      if(resGet instanceof Error){
      handleError(resGet);
      return;
      }
      setRestaurants(resGet.data);
    }
    fetchRestaurants();

  }, []);



  return (
    <div className="arrange">

      <div className="filter">
      
      </div>

      <div className="left-col">
        <h2>RESTAURANTS</h2>
        <hr></hr>

      {restaurants? 
      <div>
        {restaurants.map((restaurant)=>{
        return(
          <RestaurantCard
          id={restaurant._id}
          name={restaurant.name}
          tags={restaurant.tags}
          key={restaurant._id}
          address={restaurant.address}
          city={restaurant.city}
          state={restaurant.state}
          postalCode={restaurant.postalCode}
          photo = {restaurant.yelpPhotosUrl[0]}
          />
        )
        })}
      </div>
      :
      <h3>No restaurants found</h3>
      }
        
      </div>

      <div className="right-col">
        <h2 className="secondary-font">OUR RECOMMENDATIONS FOR YOU</h2>
        <RecommendationsCard
        mealname = "MEAL 1"
        photo
        recommended
        color="primary"
        />
        <RecommendationsCard
        mealname
        photo
        recommended
        color="secondary"
        />
        <RecommendationsCard
        mealname
        photo
        recommended
        color="brown"
        />
      </div>
  
    </div>
  );
}
