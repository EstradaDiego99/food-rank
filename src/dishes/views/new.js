import React from "react";
import { useLocation, useHistory } from "react-router-dom";

import axios from "../../utils/customAxios";
import DishForm from "./_form";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

/** View for creating new dish. */
export default function DishesNew() {
  const history = useHistory();
  const query = useQuery();
  const restaurantId = query.get("restaurant");

  async function saveDish(dish) {
    const postOptions = { headers: { "Content-Type": "multipart/form-data" } };
    const resPost = await axios
      .post("dishes", dish, postOptions)
      .catch((err) => err);
    if (resPost instanceof Error) {
      throw resPost;
    }
    history.push(`/dishes/${resPost.data.restaurantId}`);
    return resPost;
  }

  return (
    <main id="new-dish" className="container-fluid">
      <DishForm action={saveDish} dish={{ restaurantId }} />
    </main>
  );
}
