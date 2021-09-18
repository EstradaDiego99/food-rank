import React from "react";
import { useHistory } from "react-router-dom";

import { useFormState } from "../../utils/customStates";

/** Template form for the different type of fields. */
export default function DishForm({ post, action }) {
  const history = useHistory();

  const booleanField = useFormState(post?.booleanField);
  const numberField = useFormState(post?.numberField);
  const stringField = useFormState(post?.stringField);
  const dateField = useFormState(post?.dateField);

  async function savePost(e) {
    e.preventDefault();

    const confirmMessage = `The post ${stringField.val} will be saved. Continue?`;
    if (!window.confirm(confirmMessage)) return;

    const newpostInstance = {
      booleanField: booleanField.val,
      numberField: numberField.val,
      stringField: stringField.val,
      dateField: dateField.val,
    };
    const resAction = await action(newpostInstance).catch((err) => err);
    if (resAction instanceof Error && resAction.response) {
      const { err } = resAction.response.data;
      booleanField.setErr(err.booleanField);
      numberField.setErr(err.numberField);
      stringField.setErr(err.stringField);
      dateField.setErr(err.dateField);
      return;
    }
  }

  return (
    <form onSubmit={savePost} className="planes-form mb-4">
      <div className="col- col-sm-4 col-md-3 form-group">
        <input
          type="text"
          autoComplete="nope"
          className="form-control"
          value={stringField.val}
          placeholder="String field"
          onChange={(e) => stringField.setVal(e.target.value)}
        />
        <label className="form-label">String field:</label>
        <p className="text-danger">{stringField.err}</p>
      </div>

      <div className="custom-control custom-switch">
        <input
          type="checkbox"
          className="custom-control-input"
          id="cs1"
          checked={booleanField.val}
          onChange={() => booleanField.setVal(!booleanField.val)}
        />
        <label className="custom-control-label" htmlFor="cs1">
          Boolean field
        </label>
        <p className="text-danger">{booleanField.err}</p>
      </div>

      <div className="row bottom-buttons">
        <button type="submit" className="btn btn-lg bg-primary text-light">
          Save Post
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
