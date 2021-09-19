import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "../../utils/customAxios";
import { handleError } from "../../utils/front-functions";
import altImage from "../../assets/foodAlt.jpg";
<<<<<<< HEAD
import DishCard from "../../dishes/views/dishCard";
=======
//import DishCard from "../../dishes/views/dishCard";
>>>>>>> 6812f98dfb21b001fbc2f3e3509cc049eb4c2831

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
<<<<<<< HEAD
=======
      console.log("Resget", resGet);
>>>>>>> 6812f98dfb21b001fbc2f3e3509cc049eb4c2831
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
<<<<<<< HEAD
=======

>>>>>>> 6812f98dfb21b001fbc2f3e3509cc049eb4c2831
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
<<<<<<< HEAD
      <div className="align-center">
        <h1>{restaurant.name}</h1>
        <p>{restaurant.address} {restaurant.city} {restaurant.state} {restaurant.postalCode}</p>
        <Link to={`dishes/new`}>
          <button className="my-buttons primary">Go to admin</button>
        </Link>

      </div>
  
      <div className="dishes-res">
        <h2>MENU</h2>
        <hr></hr>
        {dishes && dishes.length !==0 ?
        <div>
          {dishes.map((dish)=>{
          return(
            <DishCard
              id={dish._id}
              elo={dish.elo}
              tags={dish.tags}
              restaurantId={dish.restaurantId}
              name={dish.name}
              price={dish.price}
              currency={dish.currency}
              photo = {dish.photoUrl}
            />
          )
          })}
        </div>
        :
        <h1>No dishes found</h1>
=======

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
>>>>>>> 6812f98dfb21b001fbc2f3e3509cc049eb4c2831
        }
      </div>
    </div>
  );
}