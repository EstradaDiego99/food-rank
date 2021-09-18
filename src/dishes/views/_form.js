import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import imgLoading from "../../assets/loading.svg";

import { useFormState } from "../../utils/customStates";
import Tags from "../../shared/tags";

/** Template form for the different type of fields. */
export default function DishForm({ dish, action }) {
  const history = useHistory();

  const restaurantId = useFormState(dish?.restaurantId);
  const name = useFormState(dish?.name);
  const price = useFormState(dish?.price);
  const currency = useFormState(dish?.currency);
  const tags = useFormState(dish?.tags);

  const { photoURL } = dish;
  const photoFile = useFormState();

  const [showLoading, toggleLoading] = useState(false);

  async function saveDish(e) {
    e.preventDefault();

    const newDish = new FormData();
    newDish.append("restaurantId", restaurantId.val);
    newDish.append("name", name.val);
    newDish.append("price", price.val);
    newDish.append("currency", currency.val);
    newDish.append("tags", tags.val);
    newDish.append("photoFile", photoFile.val);

    toggleLoading(true);
    const resAction = await action(newDish).catch((err) => err);
    if (resAction instanceof Error && resAction.response) {
      const { err } = resAction.response.data;
      restaurantId.setErr(err.restaurantId);
      name.setErr(err.name);
      price.setErr(err.price);
      currency.setErr(err.currency);
      photoFile.setErr(err.photoFile);
      tags.setErr(err.tags);
      return;
    }
  }

  return (
    <form onSubmit={saveDish} className="planes-form mb-4">
      <div className="col- col-sm-4 col-md-3 form-group">
        <input
          type="text"
          autoComplete="nope"
          className="form-control"
          value={restaurantId.val}
          placeholder="From restaurant (ID):"
          onChange={(e) => restaurantId.setVal(e.target.value)}
        />
        <label className="form-label">From restaurant (ID):</label>
        <p className="text-danger">{restaurantId.err}</p>
      </div>

      <div className="col- col-sm-4 col-md-3 form-group">
        <input
          type="text"
          autoComplete="nope"
          className="form-control"
          value={name.val}
          placeholder="Name:"
          onChange={(e) => name.setVal(e.target.value)}
        />
        <label className="form-label">Name:</label>
        <p className="text-danger">{name.err}</p>
      </div>

      <div className="container d-flex">
        <div className="col- col-sm-4 col-md-3 form-group">
          <input
            type="number"
            autoComplete="nope"
            className="form-control"
            value={price.val}
            placeholder="Price:"
            onChange={(e) => price.setVal(e.target.value)}
          />
          <label className="form-label">Price:</label>
          <p className="text-danger">{price.err}</p>
        </div>

        <div className="col- col-sm-4 col-md-3 form-group">
          <input
            type="text"
            autoComplete="nope"
            className="form-control"
            value={currency.val}
            placeholder="Currency:"
            onChange={(e) => currency.setVal(e.target.value)}
          />
          <label className="form-label">Currency:</label>
          <p className="text-danger">{currency.err}</p>
        </div>
      </div>

      <div>
        <Tags editMode={true}></Tags>
      </div>

      <div className="form-group d-block mb-3 p-0">
        {photoURL && <img src={photoURL} className="w-100" alt="" />}
        <div className="custom-file w-100">
          <input
            type="file"
            className="custom-file-input"
            id="photo-file"
            onChange={(e) => photoFile.setVal(e.target.files[0])}
          />
          <label className="custom-file-label" htmlFor="photo-file">
            {photoFile.val ? photoFile.val.name : "Click to set the photo URL"}
          </label>
        </div>
        <small className="text-danger">{photoFile.err}</small>
      </div>

      {showLoading ? (
        <section className="row new-form">
          <div style={{ margin: "0 auto" }}>
            <img src={imgLoading} className="loading-logo" alt="loading" />
            <p>Uploading new dish...</p>
          </div>
        </section>
      ) : (
        <div className="row bottom-buttons">
          <button type="submit" className="btn btn-lg bg-primary text-light">
            Save Dish
          </button>

          <button
            type="button"
            onClick={() => {
              const confirmMessage = `Cancel changes? Any unsaved data will be lost.`;
              if (!window.confirm(confirmMessage)) return;
              history.goBack();
            }}
            className="btn btn-lg bg-danger text-light"
          >
            Cancel
          </button>
        </div>
      )}
    </form>
  );
}
