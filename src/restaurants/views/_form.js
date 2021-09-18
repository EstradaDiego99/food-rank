import React from "react";
import { useHistory } from "react-router-dom";

import { useFormState } from "../../utils/customStates";
import TagsList from "../../shared/tags";

export default function RestaurantForm({ restaurant, action }) {
  const history = useHistory();

  const name = useFormState(restaurant?.name);
  const yelpPhotosUrl = useFormState(restaurant?.yelpPhotosUrl);
  const tags = useFormState(restaurant?.tags);
  const address = useFormState(restaurant?.address);
  const city = useFormState(restaurant?.city);
  const state = useFormState(restaurant?.state);
  const postalCode = useFormState(restaurant?.postalCode);

  async function saveRestaurant(e) {
    e.preventDefault();

    const newRestInstance = {
      name: name.val,
      yelpPhotosUrl: yelpPhotosUrl.val,
      tags: tags.val,
      address: address.val,
      city: city.val,
      state: state.val,
      postalCode: postalCode.val,
    };
    const resAction = await action(newRestInstance).catch((err) => err);
    if (resAction instanceof Error && resAction.response) {
      const { err } = resAction.response.data;
      name.setErr(err.name);
      yelpPhotosUrl.setErr(err.yelpPhotosUrl);
      tags.setErr(err.tags);
      address.setErr(err.address);
      city.setErr(err.city);
      state.setErr(err.state);
      postalCode.setErr(err.postalCode);
      return;
    }
  }

  return (
    <form onSubmit={saveRestaurant}>
      <div className="col- col-sm-4 col-md-3 form-group">
        <input
          type="text"
          autoComplete="nope"
          className="form-control"
          value={name.val}
          placeholder="Restaurant name:"
          onChange={(e) => name.setVal(e.target.value)}
        />
        <label className="form-label">Restaurant name:</label>
        <p className="text-danger">{name.err}</p>
      </div>

      <div className="container">
        {yelpPhotosUrl.val.map((photoUrl, idx) => (
          <div key={idx}>
            <img src={photoUrl} alt="" />
          </div>
        ))}
      </div>

      <div className="container">
        <TagsList tags={tags.val} editMode={true} />
      </div>

      <div className="container d-flex">
        <div className="col- col-sm-4 col-md-3 form-group flex-grow-1">
          <input
            type="text"
            autoComplete="nope"
            className="form-control"
            value={address.val}
            placeholder="Address:"
            onChange={(e) => address.setVal(e.target.value)}
          />
          <label className="form-label">Address:</label>
        </div>

        <div className="col- col-sm-4 col-md-3 form-group">
          <input
            type="text"
            autoComplete="nope"
            className="form-control"
            value={city.val}
            placeholder="City:"
            onChange={(e) => city.setVal(e.target.value)}
          />
          <label className="form-label">City:</label>
        </div>

        <div className="col- col-sm-4 col-md-3 form-group">
          <input
            type="text"
            autoComplete="nope"
            className="form-control"
            value={state.val}
            placeholder="State"
            onChange={(e) => state.setVal(e.target.value)}
          />
          <label className="form-label">State:</label>
        </div>

        <div className="col- col-sm-4 col-md-3 form-group">
          <input
            type="text"
            autoComplete="nope"
            className="form-control"
            value={postalCode.val}
            placeholder="Postal code"
            onChange={(e) => postalCode.setVal(e.target.value)}
          />
          <label className="form-label">Postal code:</label>
        </div>

        <div>
          <p className="text-danger">{address.err}</p>
          <p className="text-danger">{city.err}</p>
          <p className="text-danger">{state.err}</p>
          <p className="text-danger">{postalCode.err}</p>
        </div>
      </div>

      <div className="row bottom-buttons">
        <button type="submit" className="btn btn-lg bg-primary text-light">
          Update restaurant
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
    </form>
  );
}
