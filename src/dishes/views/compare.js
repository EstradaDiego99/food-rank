import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../hello/header";
import { EnvironmentOutlined } from "@ant-design/icons";
import axios from "../../utils/customAxios";
import { handleError } from "../../utils/front-functions";
import { toQueryString } from "../../utils/front-functions";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function displayScorePoints(scoreA, scoreB) {
  if (scoreB === 1) {
    return (
      <div className="d-flex">
        <div className="circle-comp"></div>
        <div className="circle-comp "></div>
        <div className="circle-comp"></div>
        <div className="circle-comp"></div>
        <div className="circle-comp selected"></div>
      </div>
    );
  }
  if (scoreB === 0.75) {
    return (
      <div className="d-flex">
        <div className="circle-comp"></div>
        <div className="circle-comp "></div>
        <div className="circle-comp"></div>
        <div className="circle-comp selected"></div>
        <div className="circle-comp"></div>
      </div>
    );
  }
  if (scoreB === 0.5) {
    return (
      <div className="d-flex">
        <div className="circle-comp"></div>
        <div className="circle-comp "></div>
        <div className="circle-comp selected"></div>
        <div className="circle-comp"></div>
        <div className="circle-comp"></div>
      </div>
    );
  }
  if (scoreB === 0.25) {
    return (
      <div className="d-flex">
        <div className="circle-comp"></div>
        <div className="circle-comp selected"></div>
        <div className="circle-comp"></div>
        <div className="circle-comp"></div>
        <div className="circle-comp"></div>
      </div>
    );
  }
  if (scoreB === 0) {
    return (
      <div className="d-flex">
        <div className="circle-comp selected"></div>
        <div className="circle-comp"></div>
        <div className="circle-comp"></div>
        <div className="circle-comp"></div>
        <div className="circle-comp"></div>
      </div>
    );
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
    <div className="cont-comparisons">
      <Header />
      <div className="d-flex compare-names mt-5">
        <h2>{dishAObj.name}</h2>
        <p> vs</p>

        <h2>{dishBObj.name}</h2>
      </div>

      <div className="d-flex justify-content-around align-items-center compare-restaurants">
        <h3>
          <EnvironmentOutlined /> {restAObj.name}
        </h3>
        <h3>
          <EnvironmentOutlined /> {restBObj.name}
        </h3>
      </div>

      {comparisonReviews.map((comprRev) => (
        <figure className="d-flex justify-content-around">
          <p style={{ fontWeight: "bold" }}>{comprRev.reviewA}</p>
          <div>
            {displayScorePoints(comprRev.dishAScore, comprRev.dishBScore)}
          </div>
          <p style={{ fontWeight: "bold" }}>{comprRev.reviewB}</p>
        </figure>
      ))}
    </div>
  );
}
