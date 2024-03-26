import React, { useState } from "react";
import s from "./SupplyProduct.module.scss";

import { Checkbox } from "antd";
import { Button, ConfigProvider, Space } from "antd";
import { InputNumber } from "antd";

function SupplyProduct(props) {
  const [storeCount, setStoreCount] = useState();
  const [deliveryPrice, setDeliveryPrice] = useState();

  const handleChange = (event) => {
    let checked = event.target.checked;
    if (checked) {
      const product = {
        _id: props.id,
        title: props.title,
        price: props.price,
        author: props.author,
        imgUrl: props.imgUrl,
        storeCount: Number(storeCount),
        deliveryPrice: Number(deliveryPrice),
      };

      props.products.push(product);
    }
  };

  return (
    <tr className={s.product__block}>
      <td>{props.title}</td>
      <td>{props.price}</td>
      <td>{props.storeCount}</td>
      <td>{props.categories.join(", ")}</td>
      <td>
        <ConfigProvider
          theme={{
            components: {
              InputNumber: {
                controlWidth: 130,
              },
            },
          }}
        >
          <InputNumber
            min={1}
            max={10000}
            defaultValue={null}
            onChange={(value) => setStoreCount(value)}
            placeholder="Кол-во товара"
            size={"small"}
          />
        </ConfigProvider>
      </td>
      <td>
        <ConfigProvider
          theme={{
            components: {
              InputNumber: {
                controlWidth: 130,
              },
            },
          }}
        >
          <InputNumber
            min={1}
            max={10000}
            defaultValue={null}
            onChange={(value) => setDeliveryPrice(value)}
            placeholder="Цена поставки"
            size={"small"}
          />
        </ConfigProvider>
      </td>
      <td>
        <div>
          <Checkbox onChange={handleChange}></Checkbox>
        </div>
      </td>
    </tr>
  );
}

export default SupplyProduct;
