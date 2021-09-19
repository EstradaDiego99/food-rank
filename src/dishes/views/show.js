import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";

import axios from "../../utils/customAxios";
import { handleError } from "../../utils/front-functions";
import { UserContext } from "../../utils/context";

import ReviewForm from "./_reviewForm";
import TagsList from "../../shared/tags";
import Header from "../../hello/header";

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
  const [tags, setTags] = useState();

  const { id } = useParams();
  useEffect(() => {
    loadDish(id, setDish);
  }, []);

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

  console.log(dish);

  return (
    <main>
      <Header></Header>
      <div className="image-dish">
        <img className="img-dish" src={dish.photoUrl} alt="" />
      </div>
      <div className="align-center">
        <h1>{dish.name}</h1>
        <h2 className="blue-font">
          ${dish.price} {dish.currency}
        </h2>
        <div className="align-flex">
          {dish.tags.map((tag) => {
            return <p className="tag blue thin">{tag}</p>;
          })}
        </div>
        <Link>
          <button
            type="button"
            className="my-buttons primary thicc"
            data-toggle="modal"
            data-target="#reviewModal"
            onClick={() => console.log("nanika")}
          >
            Review meal
          </button>
        </Link>
      </div>

      <ReviewForm dish={id} action={submitReview} />
    </main>
  );
}
