import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../utils/customAxios";
import { handleError } from "../../utils/front-functions";
import "./styles.css";

export default function RestaurantCard (props) {
  return ( 
    <div className="Restaurant-card">
      <h3>{props.name}</h3>
    </div>
  )
}