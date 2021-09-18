import React, { useState, useEffect } from "react";
import axios from "../../utils/customAxios";
import { handleError } from "../../utils/front-functions";

import RestaurantCard from "./restaurantCard";

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
      console.log(resGet.data);
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
          name={restaurant.name}
          />
        )
 
        })}
      </div>
      :
      <h3>No restaurants found</h3>
      }
        
      </div>

      <div className="right-col secondary-font">
        <h2>OUR RECOMMENDATIONS FOR YOU</h2>
      </div>
  
    </div>
  );
}
