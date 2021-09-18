import React from "react";
import { useHistory } from "react-router-dom";

import axios from "../../utils/customAxios";
import DishForm from "./_form";

/** View for creating new dish. */
export default function DishesNew() {
  const history = useHistory();

  async function saveDish(post) {
    const resPost = await axios.post("api/posts", post).catch((err) => err);
    if (resPost instanceof Error) {
      throw resPost;
    }

    const successResponseMsg = resPost.data.msg;
    alert(successResponseMsg);
    history.push("/post");

    return resPost;
  }

  return (
    <main id="new-post" className="container-fluid">
      <DishForm action={saveDish} />
    </main>
  );
}
