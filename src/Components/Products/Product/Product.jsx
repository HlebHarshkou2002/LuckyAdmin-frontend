import React from "react";
import { useDispatch } from "react-redux";
import { fetchRemoveProduct } from "../../../redux/slices/products";
import { Navigate } from "react-router-dom";
import axios from "../../../redux/axios";
import s from "./Product.module.scss";

import { Button, Popconfirm, message } from "antd";
import { notification, Space } from "antd";
import {
  CloseCircleOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

function Product(props) {
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

  const [api, contextHolder] = notification.useNotification();
  const openNotificationUpdate = (type) => {
    api[type]({
      message: "Выполнено!",
      description: "Товар успешно обновлён!",
    });
  };

  const openNotificationDelete = (type) => {
    api[type]({
      message: "Выполнено!",
      description: "Товар успешно удалён!",
    });
  };

  const onEdit = async () => {
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
      console.log(fields);
      const { data } = await axios.patch(`/products/${props._id}`, fields);
      if (data) {
        openNotificationUpdate("success");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const dispatch = useDispatch();

  const confirmDeleteProduct = async (e) => {
    try {
      // openNotificationDelete("success");
      dispatch(fetchRemoveProduct(props._id));
      message.success('Товар успешно удалён!');
    } catch (err) {
      console.log(err);
    }
  };
  const cancelDeleteProduct = async (e) => {
  };

  return (
    <tr className={s.product__wrapper}>
      <td>
        <input
          type="text"
          placeholder="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </td>
      <td>
        <input
          type="number"
          placeholder="price"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />{" "}
      </td>
      <td>{props.deliveryPrice}</td>
      <td>{props.storeCount}</td>
      <td>{props.categories.join(", ")}</td>
      <td>
        <div className={s.buttons__wrapper}>
          <div className={s.remove__btn}>
            <Popconfirm
              title="Удаление товара"
              description="Вы уверены, что хотите удалить товар?"
              onConfirm={confirmDeleteProduct}
              onCancel={cancelDeleteProduct}
              icon={
                <QuestionCircleOutlined
                  style={{
                    color: "red",
                  }}
                />
              }
              okText="Да"
              cancelText="Нет"
            >
              <CloseCircleOutlined style={{ color: "red" }} />
            </Popconfirm>
          </div>
          <div className={s.edit__btn} onClick={onEdit}>
            {contextHolder}
            <EditOutlined />
          </div>
        </div>
      </td>
    </tr>
  );
}

export default Product;
