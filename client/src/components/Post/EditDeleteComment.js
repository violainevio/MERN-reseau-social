import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment, editComment } from "../../actions/post.actions";
import { UidContext } from "../AppContext";

const EditDeleteComment = ({ comment, postId }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(comment.text);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(editComment(postId, comment._id, text));
    setEdit(false);
  };

  const handleDelete = () => {
    if (window.confirm("Etes-vous sûr de vouloir supprimer ce commentaire ?")) {
      console.log("postId", postId);
      console.log("comment._id", comment._id);
      dispatch(deleteComment(postId, comment._id));
      setEdit(false);
    }
  };

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.commenterId) setIsAuthor(true);
    };
    checkAuthor();
  }, [uid, comment.commenterId]);

  return (
    <div className="edit-comment">
      {isAuthor && edit === false && (
        <span onClick={() => setEdit(!edit)}>
          <img src="./img/icons/edit.svg" alt="edit-comment" />
        </span>
      )}
      {isAuthor && edit && (
        <form onSubmit={handleEdit} className="edit-comment-form">
          <label htmlFor="text" onClick={() => setEdit(false)}>
            Editer
          </label>
          <br />
          <input
            type="text"
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <br />
          <div className="btn">
            <span onClick={handleDelete}>
              <img src="./img/icons/trash.svg" alt="delete-icon" />
            </span>
            <input type="submit" value="Valider modifications" />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditDeleteComment;
