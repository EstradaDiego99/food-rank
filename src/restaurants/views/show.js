import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "../../utils/customAxios";
import { handleError } from "../../utils/front-functions";
import altImage from "../../assets/foodAlt.jpg";
//import DishCard from "../../dishes/views/dishCard";

export default function RestaurantShow() {
  const [restaurant, setRestaurant] = useState(undefined);
  const [dishes, setDishes] = useState(undefined);
  const { id } = useParams();

  useEffect(() => {

    const result = async() => {
      const resGet = await axios.get(`/restaurants/${id}`).catch((err) => err);
      if (resGet instanceof Error) {
        handleError(resGet);
        return;
      }
      console.log("Resget", resGet);
      setRestaurant(resGet.data.resFind);
      setDishes(resGet.data.resDishes);
      return;
    }

    result();
  }, [id]);

  if (!restaurant) {
    return <></>;
  }

  console.log("RESTAURANT", restaurant);
  console.log("DISHES", dishes);

  return (
    <div className="arrange-show">

      <div className="pictures-res">
        <div className="pictures-res-1">
          {restaurant.yelpPhotosUrl[0]?
            <img alt="" className="img1" src={`${restaurant.yelpPhotosUrl[0]}`}></img>
          :
            <img alt="" className="img1" src={altImage}></img>
          }
        </div>
        <div className="pictures-res-1">
             {restaurant.yelpPhotosUrl[1]?
            <img alt="" className="img1" src={`${restaurant.yelpPhotosUrl[1]}`}></img>
          :
            <img alt="" className="img1" src={altImage}></img>
          }
        </div>
        <div className="pictures-res-1">
             {restaurant.yelpPhotosUrl[2]?
            <img alt="" className="img1" src={`${restaurant.yelpPhotosUrl[2]}`}></img>
          :
            <img alt="" className="img1" src={altImage}></img>
          }
        </div> 
      </div>

      <h1>{restaurant.name}</h1>
      <p>{restaurant.address} {restaurant.city} {restaurant.state} {restaurant.postalCode}</p>
      <Link to={`dishes/new`}>
        <button className="my-buttons primary">Add dishes</button>
      </Link>
      <div className="dishes-res">
        {dishes && dishes.length !==0 ?
        <h1>YES</h1>
        :
        <h1>NO</h1>
        }
      </div>
    </div>
  );
}