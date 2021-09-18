import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "../../utils/customAxios";
import PostSummary from "./_summary";

async function fetchData(setData) {
  const resGet = await axios.get("api/posts").catch((err) => err);
  if (resGet instanceof Error) {
    alert(resGet.message);
    setData(null);
    return;
  }
  setData(resGet.data);
}

/** List of all the post instances. */
export default function PostIndex() {
  const [data, setData] = useState([]);

  useEffect(() => fetchData(setData), []);

  return (
    <main id="posts-index" className="container">
      <h1 className="w-100 text-center">Post entries list</h1>

      {data?.map((post, idx) => (
        <PostSummary key={`post-${idx}`} {...{ post }} />
      ))}

      <Link to="post/new" className="text-right">
        <button className="btn btn-lg btn-warning">New Post Instance</button>
      </Link>
    </main>
  );
}
