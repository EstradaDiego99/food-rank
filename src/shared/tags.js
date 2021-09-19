import React, { useState } from "react";
import removeIcon from "../assets/highlight_off_black_24dp.svg";
import addIcon from "../assets/add_black_24dp.svg";

/** Receives tags (maybe as a custom state) */
export default function TagsList({ tags, editMode }) {
  const innerTags = editMode ? tags.val : tags;
  const [newTag, setNewTag] = useState("");

  return (
    <>
      <div className="container d-flex flex-wrap">
        {innerTags &&
          innerTags.map((tag, idx) => (
            <div key={tag} className="d-flex m-1">
              <span>{tag}</span>
              {editMode && (
                <div
                  onClick={() => {
                    const auxAuxTags = [...innerTags];
                    auxAuxTags.splice(idx, 1);
                    tags.setVal(auxAuxTags);
                  }}
                >
                  <img src={removeIcon} alt="" />
                </div>
              )}
            </div>
          ))}
      </div>
      {editMode && (
        <div className="d-flex">
          <input
            type="text"
            autoComplete="nope"
            className="form-control"
            value={newTag}
            placeholder="New Tag:"
            onChange={(e) => setNewTag(e.target.value)}
          />
          <img
            src={addIcon}
            alt=""
            onClick={() => {
              const auxAuxTags = innerTags ? [...innerTags] : [];
              auxAuxTags.push(newTag);
              tags.setVal(auxAuxTags);
              setNewTag("");
            }}
          />
        </div>
      )}
    </>
  );
}
