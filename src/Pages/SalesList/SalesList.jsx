import React, { useState } from "react";
import Sale from "./Sale/Sale";
import s from "./SalesList.module.scss";
import { fetchProducts, searchByTitle } from "../../redux/slices/products";
import { useDispatch, useSelector } from "react-redux";
import SalesSidebar from "../../Components/SalesSidebar/SalesSidebar";
import axios from "../../redux/axios";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Radio } from "antd";
import { message, Space } from "antd";
import { Table, Tag } from "antd";

function SalesList(props) {
  const dispatch = useDispatch();
  let products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const isSalesExist = useSelector((state) => state.products.isSalesExist);
  let filteredProducts = useSelector(
    (state) => state.products.filteredProducts
  );

  const [searchValue, setSearchValue] = useState("");
  const [filePath, setFilePath] = useState("");

  const [messageApi, contextHolder] = message.useMessage();
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Отчёт сохранён успешно!",
    });
  };

  if (filteredProducts.length === 0) {
    filteredProducts = products;
  }
  console.log(filteredProducts);
  console.log(products);

  const isProductsLoading = status === "loading";

  React.useEffect(() => {
    dispatch(searchByTitle({ value: searchValue }));
  }, [searchValue]);

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  let sumSaleCount = 0;
  let sumPrice = 0;
  let sumCost = 0;
  let sumRevenue = 0;
  let saleProductCount = 0;
  if (!isProductsLoading) {
    filteredProducts.map((product) => {
      saleProductCount = 0;
      for (let sale of product.sales) {
        saleProductCount += sale.saleCount;
      }
      sumSaleCount += saleProductCount;
      sumPrice += product.price * saleProductCount;
      sumCost += product.deliveryPrice * saleProductCount;
      sumRevenue = sumPrice - sumCost;
    });
  }

  const saveReportInFile = async () => {
    const data = await axios.post("/products/report", { products });
    if (data.data.success === true) {
      success();
      setFilePath(data.data.filepath);
    }
  };

  return (
    <div className={s.sales__block}>
      <SalesSidebar />

      <Input
        size="large"
        placeholder="Поиск по наименованию"
        prefix={<SearchOutlined />}
        className={s.search__input}
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />

      <table className={s.sales__wrapper} border="1" bordercolor="#f0f0f0">
        <tr className={s.header}>
          <th className={s.header__item}>Наименование товара</th>
          <th className={s.header__item}>Продажи(Шт)</th>
          <th className={s.header__item}>Выручка (BYN)</th>
          <th className={s.header__item}>Себестоимость (BYN)</th>
          <th className={s.header__item}>Валовая прибыль (BYN)</th>
          <th className={s.header__item}>Наценка (%)</th>
          <th className={s.header__item}>Категория</th>
          <th className={s.header__item}>Поставщик</th>
          
        </tr>
        {isProductsLoading
          ? "Loading"
          : !isSalesExist
          ? "Продаж нет"
          : filteredProducts.map((product) => {
              let saleCount = 0;
              product.sales.map((sale) => {
                saleCount += sale.saleCount;
              });
              return (
                <Sale
                  title={product.title}
                  saleCount={saleCount}
                  price={product.price}
                  deliveryPrice={product.deliveryPrice}
                  isProductsLoading={isProductsLoading}
                  categories={product.categories}
                  provider={product.provider}
                />
              );
            })}

        <tr className={s.header}>
          <th className={s.header__item}>Итого</th>
          <th className={s.header__item}>{sumSaleCount}</th>
          <th className={s.header__item}>{sumPrice.toFixed(2)}</th>
          <th className={s.header__item}>{sumCost.toFixed(2)}</th>
          <th className={s.header__item}>{sumRevenue.toFixed(2)}</th>
          <th className={s.header__item}></th>
          <th className={s.header__item}></th>
          <th className={s.header__item}></th>
          
        </tr>
      </table>
      {contextHolder}
      <div className={s.save__report__button}>
        <Space>
          <Button
            type="primary"
            shape="round"
            icon={<DownloadOutlined />}
            size={"medium"}
            onClick={saveReportInFile}
          >
            Сохранить отчёт в файл
          </Button>
        </Space>
      </div>
    </div>
  );
}

export default SalesList;
