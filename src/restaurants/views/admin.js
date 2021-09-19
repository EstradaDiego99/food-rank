import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "../../utils/customAxios";
import { handleError } from "../../utils/front-functions";

import RestaurantForm from "./_form";
import { toQueryString } from "../../utils/front-functions";
import Header from "../../hello/header";

export default function RestaurantAdmin() {
  const history = useHistory();
  const [restaurant, setRestaurant] = useState(undefined);

  const { id } = useParams();

  useEffect(() => {
    async function loadRestaurant() {
      const resGet = await axios.get(`/restaurants/${id}`).catch((err) => err);
      if (resGet instanceof Error) {
        handleError(resGet);
        return;
      }
      setRestaurant(resGet.data);
      console.log(resGet.data);
    }

    loadRestaurant();
  }, [id]);

  async function saveRestaurant(restaurant) {
    const resPost = await axios
      .put(`/restaurants/${id}`, restaurant)
      .catch((err) => err);
    if (resPost instanceof Error) {
      throw resPost;
    }
    // const successResponseMsg = resPost.data.msg;
    // alert(successResponseMsg);
    history.push(`/restaurants/${id}`);
    return resPost;
  }

  if (!restaurant) {
    return <></>;
  }

  return (
    <div className="admin_form_rest">
      <Header></Header>
      <div className="row justify-content-between row-form row-title">
        <h1 className="title-admin">{restaurant.name}</h1>
        <Link
          className="my-buttons secondary form-bottom"
          to={`/dishes/new?${toQueryString({ restaurant: id })}`}
        >
          Add dish
        </Link>
      </div>

      <div className="d-flex justify-content-center">
        <RestaurantForm restaurant={restaurant} action={saveRestaurant} />
      </div>
    </div>
  );
}
