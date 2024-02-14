import React from "react";
import { useDispatch } from "react-redux";
import { fetchRemoveProduct } from "../../../redux/slices/products";
import { Navigate } from "react-router-dom";
import axios from "../../../redux/axios";
import s from "./AdminProduct.module.scss"

function AdminProduct(props) {
  const [title, setTitle] = React.useState(props.title);
  const [price, setPrice] = React.useState(props.price);
  const [description, setDescription] = React.useState(props.description);
  const [author, setAuthor] = React.useState(props.author);
  const [imgUrl, setImgUrl] = React.useState(props.imgUrl);
  const [genres, setGenres] = React.useState(props.genres);
  const [ageRestriction, setAgeRestriction] = React.useState(
    props.ageRestriction
  );
  const [complexity, setComplexity] = React.useState(props.complexity);
  const [rating, setRating] = React.useState(props.rating);

  const onEdit = async () => {
    if (window.confirm("Вы действительно хотите обновить товар")) {
      try {
        const fields = {
          title,
          price,
          description,
          author,
          imgUrl,
          genres,
          ageRestriction,
          complexity,
          rating,
        };
        console.log(fields)
        const { data } = await axios.patch(`/products/${props._id}`, fields);
      } catch (err) {
        console.log(err)
      }
    }
  };

  const dispatch = useDispatch();

  const removeProduct = async () => {
    if (window.confirm("Вы действительно хотите удалить товар")) {
      debugger;
      dispatch(fetchRemoveProduct(props._id));
      console.log(props._id);
    }
  };

  return (
    <div className={s.product__wrapper}>
      <div>
        <input
          type="text"
          placeholder="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="price"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />{" "}
        BYN
      </div>
      <div>{props.genres.join(", ")}</div>
      <div>{props.userName}</div>
      <div>
        <button className="remove__btn" onClick={removeProduct}>
          -
        </button>
      </div>
      <div>
        <button className="edit__btn" onClick={onEdit}>
          ...edit
        </button>
      </div>
    </div>
  );
}

export default AdminProduct;
