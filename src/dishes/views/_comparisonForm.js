import React, { useState } from "react";

import { useFormState } from "../../utils/customStates";
import "./styles.css";
export default function ComparisonForm({
  dishA,
  dishB,
  action,
  setSimilarDishesIdx,
}) {
  const [atoB, setAtoB] = useState(0.5);
  const comparisonMessage = useFormState();

  const btoA = 1 - atoB;

  async function saveComparison(e) {
    e.preventDefault();

    const newComparisonData = {
      dishA: dishA._id,
      dishAScore: atoB,
      dishB: dishB._id,
      dishBScore: btoA,
    };
    const resAction = await action(newComparisonData).catch((err) => err);
    if (resAction instanceof Error && resAction.response) {
      const { err } = resAction.response.data;
      comparisonMessage.setErr(err.comparisonMessage);
      return;
    }
  }

  return (
    <form onSubmit={saveComparison} className="card card-body">
      <div className="d-flex"></div>

      <h2>Among these two, which one did you like the most?</h2>
      <div className="d-flex align-items-center justify-content-between">
        <img src={dishB.photoUrl} style={{ maxWidth: "100px" }} />
        <img src={dishA.photoUrl} style={{ maxWidth: "100px" }} />
      </div>

      <div className="d-flex align-items-center justify-content-between">
        <p className="comparison_meal">{dishB.name}</p>
        <button
          className="comparison_button"
          type="button"
          onClick={() => setAtoB(0)}
        ></button>
        <button
          className="comparison_button"
          type="button"
          onClick={() => setAtoB(0.25)}
        ></button>
        <button
          className="comparison_button"
          type="button"
          onClick={() => setAtoB(0.5)}
        ></button>
        <button
          className="comparison_button"
          type="button"
          onClick={() => setAtoB(0.75)}
        ></button>
        <button
          className="comparison_button"
          type="button"
          onClick={() => setAtoB(1)}
        ></button>
        <p className="comparison_meal">{dishA.name}</p>
      </div>

      <div className="row bottom-buttons justify-content-around mt-5">
        <button type="submit" className="btn btn-lg bg-primary text-light">
          Send Comparison
        </button>

        <button
          type="button"
          data-dismiss="modal"
          className="btn btn-lg bg-secondary text-light"
          onClick={() => setSimilarDishesIdx((idx) => idx + 1)}
        >
          Skip
        </button>

        <button
          type="button"
          data-dismiss="modal"
          className="btn btn-lg bg-danger text-light"
          onClick={() => setSimilarDishesIdx(-1)}
        >
          Close
        </button>
      </div>
    </form>
  );
}
