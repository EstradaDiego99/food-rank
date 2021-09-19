import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import axios from "../../utils/customAxios";
import { handleError } from "../../utils/front-functions";

import ReviewForm from "./_reviewForm";
import { UserContext } from "../../utils/context";

async function loadDish(id, setDishes) {
  const resGet = await axios.get(`/dishes/${id}`).catch((err) => err);
  if (resGet instanceof Error) {
    handleError(resGet);
    return;
  }
  setDishes(resGet.data);
}

export default function ShowDish() {
  const history = useHistory();
  const [dish, setDish] = useState(undefined);

  const { id } = useParams();
  useEffect(() => loadDish(id, setDish), [id]);

  const accessToken = useContext(UserContext);

  async function submitReview(review) {
    review.accessToken = accessToken;
    const resPost = await axios.post(`/reviews`, review).catch((err) => err);
    if (resPost instanceof Error) {
      throw resPost;
    }
    history.push(`/dishes/${id}`);
    return resPost;
  }

  if (!dish) {
    return <></>;
  }

  return (
    <main>
      <p>{dish.name}</p>
      <img src={dish.photoUrl} alt="" />
      <p>{dish.price}</p>
      <p>{dish.currency}</p>

      <button
        type="button"
        className="btn btn-lg"
        data-toggle="modal"
        data-target="#reviewModal"
        onClick={() => console.log("nanika")}
      >
        Review meal
      </button>

      <ReviewForm dish={id} action={submitReview} />
    </main>
  );
}
