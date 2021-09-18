import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "../../utils/customAxios";
import { handleError } from "../../utils/front-functions";

async function loadRestaurant(id, setRestaurant) {
  const resGet = await axios.get(`/restaurants/${id}`).catch((err) => err);
  if (resGet instanceof Error) {
    handleError(resGet);
    return;
  }
  setRestaurant(resGet.data);
}

export default function RestaurantShow() {
  const [restaurant, setRestaurant] = useState(undefined);

  const { id } = useParams();

  useEffect(() => {
    loadRestaurant(id, setRestaurant);
  }, [id]);

  if (!restaurant) {
    return <></>;
  }

  return (
    <div>
      <p>Restaurant</p>
      <p>{restaurant.name}</p>
      <Link to="/">
        <button className="my-buttons primary">Admin</button>
      </Link>
    </div>
  );
}