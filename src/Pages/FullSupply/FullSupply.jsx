import React, { useState } from "react";
import s from "./FullSupply.module.scss";
import { useParams } from "react-router-dom";
import axios from "../../redux/axios";
import Product from "../../Components/Product/Product";

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
    <div>
      <div>{data.title}</div>
      <div>
        Дата создания:
        {new Date(data.createdAt).getDate() + "."}
        {new Date(data.createdAt).getMonth() + "."}
        {new Date(data.createdAt).getFullYear()}
      </div>
      <div>
        Дата поставки:
        {new Date(data.dateOfDelivery).getDate() + "."}
        {new Date(data.dateOfDelivery).getMonth() + "."}
        {new Date(data.dateOfDelivery).getFullYear()}
      </div>
      <div>
        Поставщик:
        {data.provider.providerName}
      </div>
      <div>
        Контакты поставщика:
        {data.provider.email}
      </div>
      <div>
        Комментарии к поставке:
        {data.comments}
      </div>
      <div>
        {data.products.map((product) => (
            <Product title={product.title} imgUrl={product.imgUrl} author={product.author} price={product.price}/>
        ))}
      </div>
    </div>
  );
}

export default FullSupply;
