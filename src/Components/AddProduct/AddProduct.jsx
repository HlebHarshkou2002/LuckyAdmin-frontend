import axios from "../../redux/axios";
import React from "react";
import s from "./AddProduct.module.scss";

import { Input } from "antd";
import { Select } from "antd";
import { Button, Flex } from "antd";

import { notification, Space } from "antd";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/slices/products";

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

  const dispatch = useDispatch();

  const categoriesArray = [
    "Научная литература",
    "Программирование",
    "Предпринимательская деятельность",
    "Дизайн и искусство",
    "Языки",
    "Зарубежная литература",
    "Право",
  ];

  const [api, contextHolder] = notification.useNotification();
  const openNotificationCreate = (type) => {
    api[type]({
      message: "Выполнено!",
      description: "Товар успешно добавлен!",
    });
  };

  const onSubmit = async () => {
    try {
      let storeCount = 0;
      const fields = {
        title,
        price,
        description,
        author,
        imgUrl,
        categories: [categories],
        ageRestriction,
        storeCount,
        complexity,
        rating,
        deliveryPrice: 0
      };
      const { data } = await axios.post("/products", fields);
      if (data) {
        openNotificationCreate("success");
        dispatch(addProduct({fields: fields}))
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeCategories = (value) => {
    setCategories(value);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <div className={s.block__wrapper}>
      {contextHolder}
      <div>
        <Input
          type="text"
          placeholder="Наименование товара"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <Input
          type="number"
          placeholder="Отпускная цена"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div>
        <Input
          type="text"
          placeholder="Описание товара"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <Input
          type="text"
          placeholder="Производитель"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div>
        <Input
          type="text"
          placeholder="Ссылка на фото"
          name="imgUrl"
          value={imgUrl}
          onChange={(e) => setImgUrl(e.target.value)}
        />
      </div>
      <div>
        <Select
          showSearch
          placeholder="Выберите категорию"
          optionFilterProp="category"
          filterOption={filterOption}
          options={categoriesArray.map((item) => ({
            label: item,
            value: item,
          }))}
          name="categories"
          onChange={onChangeCategories}
          className={s.select__category}
        />
      </div>
      <div>
        <Input
          type="number"
          placeholder="Возрастное ограничение"
          name="ageRestriction"
          value={ageRestriction}
          onChange={(e) => setAgeRestriction(e.target.value)}
        />
      </div>
      <div>
        <Input
          type="text"
          placeholder="Сложность"
          name="complexity"
          value={complexity}
          onChange={(e) => setComplexity(e.target.value)}
        />
      </div>
      <div>
        <Input
          type="number"
          placeholder="Рейтинг"
          name="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
      </div>
      <div>
        <Flex gap="small" wrap="wrap">
          <Button type="primary" onClick={onSubmit} size="large">Добавить товар</Button>
        </Flex>
      </div>
    </div>
  );
}

export default AddProduct;
