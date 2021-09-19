import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import axios from "../../utils/customAxios";
import { handleError } from "../../utils/front-functions";
import { toQueryString } from "../../utils/front-functions";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function displayScorePoints(scoreA, scoreB) {
  if (scoreB === 1) {
    return "....*";
  }
  if (scoreB === 0.75) {
    return "...*.";
  }
  if (scoreB === 0.5) {
    return "..*..";
  }
  if (scoreB === 0.25) {
    return ".*...";
  }
  if (scoreB === 0) {
    return "*....";
  }
}

export default function DishesCompare() {
  const query = useQuery();

  const [comparisonReviews, setComparisonReviews] = useState([]);
  const [dishAObj, setDishAObj] = useState([]);
  const [dishBObj, setDishBObj] = useState([]);
  const [restAObj, setRestAObj] = useState([]);
  const [restBObj, setRestBObj] = useState([]);

  const dishA = query.get("dishA");
  const dishB = query.get("dishB");

  useEffect(() => {
    const fetchComparisonReviews = async () => {
      const resGet = await axios
        .get(`/dishes/comparisonReviews?${toQueryString({ dishA, dishB })}`)
        .catch((err) => err);
      if (resGet instanceof Error) {
        handleError(resGet);
        return;
      }
      console.log(resGet.data);
      setComparisonReviews(resGet.data.comparisonReviews);
      setDishAObj(resGet.data.dishAObj);
      setDishBObj(resGet.data.dishBObj);
      setRestAObj(resGet.data.restAObj);
      setRestBObj(resGet.data.restBObj);
    };
    fetchComparisonReviews();
  }, []);

  return (
    <div>
      <div className="d-flex">
        <p>{dishAObj.name}</p>
        <p>{dishBObj.name}</p>
      </div>

      <div className="d-flex">
        <p>{restAObj.name}</p>
        <p>{restBObj.name}</p>
      </div>

      {comparisonReviews.map((comprRev) => (
        <figure className="d-flex">
          <p>{comprRev.reviewA}</p>
          <div>
            {displayScorePoints(comprRev.dishAScore, comprRev.dishBScore)}
          </div>
          <p>{comprRev.reviewB}</p>
        </figure>
      ))}
    </div>
  );
}
