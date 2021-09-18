import React from "react";
import { useHistory } from "react-router-dom";

import axios from "../../utils/customAxios";
import PostForm from "./_form";

/** View for new post instance. */
export default function PostNew() {
  const history = useHistory();

  async function savePost(post) {
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
      <PostForm action={savePost} />
    </main>
  );
}
