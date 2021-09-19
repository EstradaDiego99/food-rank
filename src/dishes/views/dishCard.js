import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

import iconPlace from "../../assets/place_black_24dp.svg";

export default function DishCard(props) {
  const [tags, setTags] = useState();

  useEffect(() => {
    setTags(props.tags);
  }, [props.tags]);

  return (
    <Link className="link" to={`/dishes/${props.id}`}>
      <div className="Restaurant-card border-radius-1">
        <div className="arrange-card">
          <div className="left-card">
            <h3 className="mb-1">{props.name}</h3>
            <div className="d-flex mb-2">
              <img src={iconPlace} alt="" style={{ height: "1.5em" }} />
            </div>
            {props.restaurant && (
              <div className="d-flex mb-2">
                <img src={iconPlace} alt="" style={{ height: "1.5em" }} />
                <h6>{props.restaurant?.name}</h6>
              </div>
            )}
            {tags ? (
              <div className="tags">
                {tags.map((tag, index) => (
                  <div key={index}>
                    {index < 5 && (
                      <div>
                        {index % 2 === 0 ? (
                          <p className="tag green" key="tag">
                            {tag}
                          </p>
                        ) : (
                          <p className="tag blue" key="tag">
                            {tag}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
            <div className="address-res-card">
              <h5>
                ${props.price} {props.currency}
              </h5>
            </div>
          </div>
          <div className="image-res-card">
            <img className="image-res" src={props.photo} alt=""></img>
          </div>
        </div>
      </div>
    </Link>
  );
}
