import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";

export default function RestaurantCard (props) {

  const [tags, setTags] = useState();


  useEffect(()=>{
   setTags(props.tags)
  },[props.tags]);

  return ( 
  <Link className="link" to={`/restaurants/${props.id}`}>
   <div className="Restaurant-card border-radius-1">
      <div className="arrange-card">
        <div className="left-card">
              <h3>{props.name}</h3>
          {tags?
            <div className="tags">
              {tags.map((tag,index)=>{
              return(
                <div>
                {index <5 && 
                  <div>
                    {(index%2 === 0)? 
<<<<<<< HEAD
                      <p className="tag green" key="tag">{tag}</p>
=======
                      <p className="tag primary" key="tag">{tag}</p>
>>>>>>> 6812f98dfb21b001fbc2f3e3509cc049eb4c2831
                      :
                      <p className="tag blue" key="tag">{tag}</p>
                    }
                  </div>
                }
                </div>
              ) 
          
            })}
          </div>
          :
          <></>
          }
          <div className="address-res-card">
            <p>
              {props.address} {props.city} {props.state} {props.postalCode}
            </p>
          </div>
        </div>
        <div className="image-res-card">
          <img alt="" className="image-res" src={props.photo}></img>
        </div>
      </div>
    </div>
  </Link>
   
  )
}