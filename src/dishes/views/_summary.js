import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import deleteIcon from "../../assets/delete_white_24dp.svg";
import editIcon from "../../assets/edit_white_24dp.svg";

import axios from "../../utils/customAxios";

async function removePost(post, history) {
  const confirmMessage = `The post ${post._id} will be removed. Continue?`;
  if (!window.confirm(confirmMessage)) return;

  const resDelete = await axios
    .delete("api/posts/" + post._id)
    .catch((err) => err);
  if (resDelete instanceof Error) {
    alert(resDelete.response.data.msg);
  }

  const successfulResponseMsg = resDelete.data.msg;
  alert(successfulResponseMsg);
  history.push = "/post";
}

/** List of all the post instances. */
export default function PostSummary({ post }) {
  const history = useHistory();

  const { indexField, booleanField, numberField, stringField, dateField } =
    post;

  return (
    <figure className="summary bg-secondary">
      <Link
        to={"/post/" + post._id}
        className="post-content"
        target="_blank"
        rel="noreferrer"
      >
        <div className="flex-grow-1">
          <p>{indexField}</p>
          <p>{booleanField}</p>
          <p>{numberField}</p>
          <p>{stringField}</p>
          <p>{dateField}</p>
        </div>
      </Link>

      <div className="d-flex icons-container">
        <Link to={`/post/${indexField}/edit`} className="edit-button">
          <img src={editIcon} alt="delete" />
        </Link>

        <button
          onClick={() => removePost(post, history)}
          className="delete-button"
        >
          <img src={deleteIcon} alt="delete" />
        </button>
      </div>
    </figure>
  );
}
