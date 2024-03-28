import React, { useState } from "react";
import s from "./FullSupply.module.scss";
import { useParams } from "react-router-dom";
import axios from "../../redux/axios";
import Product from "../../Components/Product/Product";

import { Typography } from "antd";
const { Title } = Typography;

function FullSupply(props) {
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState();
  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`/supplies/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Ошибка при получении поставки");
      });
  }, []);

  if (isLoading) {
    return "Loading";
  }

  return (
    <div className={s.supply__block}>
      <Title level={3}>{data.title}</Title>
      <div>
        <Title level={5} className={s.supply__date}>
          Дата создания:
        </Title>

        {new Date(data.createdAt).getDate() + "."}
        {new Date(data.createdAt).getMonth() + "."}
        {new Date(data.createdAt).getFullYear()}
      </div>
      <div>
        <Title level={5} className={s.supply__date}>
          Дата поставки:
        </Title>
        {new Date(data.dateOfDelivery).getDate() + "."}
        {new Date(data.dateOfDelivery).getMonth() + "."}
        {new Date(data.dateOfDelivery).getFullYear()}
      </div>
      <div>
        <Title level={5} className={s.supply__date}>
          Поставщик:
        </Title>
        {data.provider?.providerName ? data.provider.providerName : "Поставщик удалён"} 
      </div>
      <div>
        <Title level={5} className={s.supply__date}>
          Контакты поставщика:
        </Title>

        {data.provider?.email ? data.provider.email : "Поставщик удалён"}
      </div>
      <div>
        <Title level={5} className={s.supply__date}>
          Примечание к поставке:
        </Title>
        {data.comments}
      </div>
      <table className={s.sales__wrapper} border="1" bordercolor="#f0f0f0">
        <tr className={s.header}>
          <th className={s.header__item}>Фото товара</th>
          <th className={s.header__item}>Наименование товара</th>
          <th className={s.header__item}>Производитель</th>
          <th className={s.header__item}>Цена на сайте(BYN)</th>
        </tr>
        {data.products.map((product) => (
          <Product
            _id={product._id}
            title={product.title}
            imgUrl={product.imgUrl}
            author={product.author}
            price={product.price}
          />
        ))}
      </table>
    </div>
  );
}

export default FullSupply;
