import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";

import axios from "../../utils/customAxios";
import { handleError } from "../../utils/front-functions";
import { UserContext } from "../../utils/context";

import ReviewForm from "./_reviewForm";
import ComparisonForm from "./_comparisonForm";
import TagsList from "../../shared/tags";
import Header from "../../hello/header";

import avatar from "../../assets/2.png";
import avatar2 from "../../assets/3.png";

export default function ShowDish() {
  const [dish, setDish] = useState(undefined);
  const [reviews, setReviews] = useState([]);

  const [similarDishes, setSimilarDishes] = useState([]);
  const [similarDishesIdx, setSimilarDishesIdx] = useState(-1);

  const [showReview, toggleShowReview] = useState(false);

  const accessToken = useContext(UserContext);

  const { id } = useParams();
  useEffect(() => {
    async function loadDish() {
      const resGet = await axios
        .get(`/dishes/${id}?token=${accessToken}`)
        .catch((err) => err);
      if (resGet instanceof Error) {
        handleError(resGet);
        return;
      }
      setDish(resGet.data.objDish);
      console.log("AHIRAM", resGet.data.objDish);
      setReviews(resGet.data.reviews);
      setSimilarDishes(resGet.data.similarDishes);
    }

    loadDish();
  }, [id, accessToken]);

  async function submitReview(review) {
    review.accessToken = accessToken;
    const resPost = await axios.post(`/reviews`, review).catch((err) => err);
    if (resPost instanceof Error) {
      throw resPost;
    }
    toggleShowReview(false);
    setSimilarDishesIdx(0);
  }

  async function submitComparison(comparison) {
    comparison.accessToken = accessToken;
    const resPost = await axios
      .post(`/comparisons`, comparison)
      .catch((err) => err);
    if (resPost instanceof Error) {
      throw resPost;
    }
    setSimilarDishesIdx((similarDishesIdx) => similarDishesIdx + 1);
    return resPost;
  }

  if (!dish) {
    return <></>;
  }

  const reviewModalStyle = showReview
    ? { display: "block", backgroundColor: "rgba(0, 0, 0, 0.85)" }
    : {};

  const comparisonModalStyle =
    similarDishesIdx >= 0 && similarDishesIdx < similarDishes.length
      ? { display: "block", backgroundColor: "rgba(0, 0, 0, 0.85)" }
      : {};

  return (
    <main>
      <Header />
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
            onClick={() => toggleShowReview(true)}
          >
            Review meal
          </button>
        </Link>
      </div>

      <div
        className="modal"
        tabIndex="-1"
        role="dialog"
        style={reviewModalStyle}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content" style={{ borderRadius: "1em" }}>
            <ReviewForm
              dish={id}
              action={submitReview}
              toggleShowReview={toggleShowReview}
            />
          </div>
        </div>
      </div>

      <div
        className="modal"
        tabIndex="-1"
        role="dialog"
        style={comparisonModalStyle}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content" style={{ borderRadius: "1em" }}>
            {similarDishesIdx >= 0 &&
              similarDishesIdx < similarDishes.length && (
                <ComparisonForm
                  dishA={dish}
                  dishB={similarDishes[similarDishesIdx]}
                  action={submitComparison}
                  setSimilarDishesIdx={setSimilarDishesIdx}
                />
              )}
          </div>
        </div>
      </div>

      <div className="container">
        {reviews &&
          reviews.map((review, index) => (
            <figure
              key={review._id}
              className="figure-review"
              style={
                index % 2 === 0
                  ? { backgroundColor: "#f8982b" }
                  : { backgroundColor: "#6bc4a6" }
              }
            >
              <img src={index % 2 === 0 ? avatar : avatar2} alt="avatar" />
              <div>
                <p style={{ fontWeight: "bold" }}>{review.userName}</p>
                <p>{review.reviewMessage}</p>
              </div>
            </figure>
          ))}
      </div>
    </main>
  );
}
