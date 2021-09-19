import React from "react";
import { useHistory } from "react-router-dom";
import { useFormState } from "../../utils/customStates";
import TagsList from "../../shared/tags";
import "./styles.css";
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
    <>
      {/*<div className="rest-admin__container">
        {yelpPhotosUrl.val.map((photoUrl, idx) => (
          <div key={idx}>
            <img src={photoUrl} alt="" />
          </div>
        ))}
      </div>*/}
      <form onSubmit={saveRestaurant} className="rest-admin__form">
        <div className="col-sm-12 form-group">
          <label className="form-label" for="name">
            Restaurant name:
          </label>
          <input
            type="text"
            id="name"
            autoComplete="nope"
            className="form-control"
            value={name.val}
            placeholder="Restaurant name:"
            onChange={(e) => name.setVal(e.target.value)}
          />
          <p className="text-danger">{name.err}</p>
        </div>

        <div className="container d-flex flex-none">
          <div className="col-sm-12 col-md-3 col-lg-3 form-group flex-grow-1">
            <label className="form-label">Address:</label>
            <input
              type="text"
              autoComplete="nope"
              className="form-control"
              value={address.val}
              placeholder="Address:"
              onChange={(e) => address.setVal(e.target.value)}
            />
          </div>
          <div className="col-sm-12 col-md-3 col-lg-3 form-group">
            <label className="form-label">City:</label>
            <input
              type="text"
              autoComplete="nope"
              className="form-control"
              value={city.val}
              placeholder="City:"
              onChange={(e) => city.setVal(e.target.value)}
            />
          </div>
          <div className="col-sm-12 col-md-3 col-lg-3 form-group">
            <label className="form-label">State:</label>
            <input
              type="text"
              autoComplete="nope"
              className="form-control"
              value={state.val}
              placeholder="State"
              onChange={(e) => state.setVal(e.target.value)}
            />
          </div>

          <div className="col-sm-12 col-md-3 col-lg-3 form-group">
            <label className="form-label">Postal code:</label>
            <input
              type="text"
              autoComplete="nope"
              className="form-control"
              value={postalCode.val}
              placeholder="Postal code"
              onChange={(e) => postalCode.setVal(e.target.value)}
            />
          </div>
          <div>
            <p className="text-danger">{address.err}</p>
            <p className="text-danger">{city.err}</p>
            <p className="text-danger">{state.err}</p>
            <p className="text-danger">{postalCode.err}</p>
          </div>
        </div>
        <div className="container">
          <TagsList tags={tags} editMode={true} />
        </div>
        <div className="row bottom-buttons mt-5 justify-content-center">
          <div class="col-10 row-buttons">
            <button type="submit" className="my-buttons primary form-button">
              Update restaurant
            </button>

            <button
              type="button"
              onClick={() => {
                const confirmMessage = `Cancel changes? Any unsaved data will be lost.`;
                if (!window.confirm(confirmMessage)) return;
                history.goBack();
              }}
              className="my-buttons primary form-button"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
