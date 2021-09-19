import React from "react";

import { useFormState } from "../../utils/customStates";
export default function ReviewForm({ dish, action, toggleShowReview }) {
  const dishId = useFormState(dish);
  const userId = useFormState(); // Get user from context
  const reviewMessage = useFormState();

  async function saveReview(e) {
    e.preventDefault();
    const newReviewInstance = {
      dishId: dishId.val,
      reviewMessage: reviewMessage.val,
    };
    const resAction = await action(newReviewInstance).catch((err) => err);
    if (resAction instanceof Error && resAction.response) {
      const { err } = resAction.response.data;
      dishId.setErr(err.dishId);
      reviewMessage.setErr(err.reviewMessage);
      return;
    }
  }

  return (
    <form onSubmit={saveReview} className="card card-body">
      <h2>Give your review</h2>

      <div className="form-group">
        <label className="form-label">
          Tell us what you think about this dish:
        </label>
        <input
          type="text"
          autoComplete="nope"
          className="form-control"
          value={reviewMessage.val}
          placeholder="Tell us what you think about this dish:"
          onChange={(e) => reviewMessage.setVal(e.target.value)}
        />
        <p className="text-danger">{reviewMessage.err}</p>
      </div>

      <p className="text-danger">{dishId.err}</p>
      <p className="text-danger">{userId.err}</p>

      <div className="row bottom-buttons justify-content-center">
        <button type="submit" className="my-buttons primary">
          Review dish
        </button>

        <button
          type="button"
          data-dismiss="modal"
          className="my-buttons secondary"
          onClick={() => toggleShowReview(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
