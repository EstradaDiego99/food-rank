import React from "react";
import "./styles.css";

export default function RecomendationsCard(props) {
  return (
    <div className={`Restaurant-card border-radius-2 ${props.color}`}>
      <br></br>
      <h3>{props.mealname}</h3>
    </div>
  );
}
