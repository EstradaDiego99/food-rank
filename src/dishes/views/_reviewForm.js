import React from "react";

import { useFormState } from "../../utils/customStates";

export default function ReviewForm({ dish, action }) {
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
    <div
      className="modal fade"
      id="reviewModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="modal-label"
      aria-hidden="true"
      style={{ display: "block", opacity: 1 }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content" style={{ borderRadius: "1em" }}>
          <form onSubmit={saveReview} className="card card-body">
            <div className="form-group">
              <input
                type="text"
                autoComplete="nope"
                className="form-control"
                value={reviewMessage.val}
                placeholder="Tell us what you think about this dish:"
                onChange={(e) => reviewMessage.setVal(e.target.value)}
              />
              <label className="form-label">
                Tell us what you think about this dish:
              </label>
              <p className="text-danger">{reviewMessage.err}</p>
            </div>

            <p className="text-danger">{dishId.err}</p>
            <p className="text-danger">{userId.err}</p>

            <div className="row bottom-buttons">
              <button
                type="submit"
                className="btn btn-lg bg-primary text-light"
              >
                Review dish
              </button>

              <button
                type="button"
                data-dismiss="modal"
                className="btn btn-lg bg-danger text-light"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
