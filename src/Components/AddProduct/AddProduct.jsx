import axios from "../../redux/axios";
import React from "react";
import s from "./AddProduct.module.scss";

function AddProduct() {
  const [title, setTitle] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [imgUrl, setImgUrl] = React.useState("");
  const [categories, setCategories] = React.useState("");
  const [ageRestriction, setAgeRestriction] = React.useState("");
  const [complexity, setComplexity] = React.useState("");
  const [rating, setRating] = React.useState("");

  const categoriesArray = ["Научная литература", "Программирование", "Предпринимательская деятельность", "Дизайн и искусство", "Языки", "Зарубежная литература", "Право"];

  const onSubmit = async () => {
    try {
      let storeCount = 0;
      const fields = {
        title,
        price,
        description,
        author,
        imgUrl,
        categories,
        ageRestriction,
        storeCount,
        complexity,
        rating,
      };
      const { data } = await axios.post("/products", fields);
      if (data) {
        alert("Товар создан!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log();
  return (
    <div className={s.block__wrapper}>
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
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="author"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="imgUrl"
          name="imgUrl"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
        />
      </div>
      <div>
        <select name="categories" id="" onChange={(e) => setCategories(e.target.value)}> 
          {categoriesArray.map((item) => {
            return(
                <option value={item}>{item}</option>
            )
          })}
        </select>
      </div>
      <div>
        <input
          type="number"
          placeholder="ageRestriction"
          name="ageRestriction"
          value={ageRestriction}
          onChange={(e) => setAgeRestriction(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="complexity"
          name="complexity"
          value={complexity}
          onChange={(e) => setComplexity(e.target.value)}
        />
      </div>
      <div>
        <input
          type="number"
          placeholder="rating"
          name="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </div>
      <div>
        <button onClick={onSubmit}>Create Product</button>
      </div>
    </div>
  );
}

export default AddProduct;
