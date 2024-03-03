import React, { useState } from "react";
import Sale from "./Sale/Sale";
import s from "./SalesList.module.scss";
import { fetchProducts, searchByTitle } from "../../redux/slices/products";
import { useDispatch, useSelector } from "react-redux";
import SalesSidebar from "../../Components/SalesSidebar/SalesSidebar";
import axios from "../../redux/axios";

function SalesList(props) {
  const dispatch = useDispatch();
  let products= useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const isSalesExist = useSelector((state) => state.products.isSalesExist)
  let filteredProducts = useSelector((state) => state.products.filteredProducts);

  const [searchValue, setSearchValue] = useState('')
  const [filePath, setFilePath] = useState('')


  if(filteredProducts.length === 0) {
    filteredProducts = products
  }

  const isProductsLoading = status === "loading";

  React.useEffect(() => {
    dispatch(searchByTitle({value: searchValue}));
  }, [searchValue]);

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  let sumSaleCount = 0;
  let sumPrice = 0;
  let saleProductCount = 0
  if (!isProductsLoading) {
    filteredProducts.map((product) => {
      saleProductCount = 0
      for(let sale of product.sales) {
        saleProductCount += sale.saleCount
      }
      sumSaleCount += saleProductCount;
      sumPrice += product.price * saleProductCount;
    });
  }

  const saveReportInFile = async () => {
    const data = await axios.post('/products/report', {products})
    console.log(data)
    if(data.data.success === true ) {
      alert("Отчёт сохранён")
      setFilePath(data.data.filepath)
    }
  }

  return (
    <div>
      <SalesSidebar/>
      <input type="text" placeholder="Поиск по наименованию" value={searchValue} onChange={(e) => {setSearchValue(e.target.value)}}/>
      <div className={s.sales__wrapper}>
        <div className={s.header}>
          <div className={s.header__item}>Наименование товара</div>
          <div className={s.header__item}>Продажи(Шт)</div>
          <div className={s.header__item}>Сумма (BYN)</div>
          <div className={s.header__item}>Категория</div>
          <div className={s.header__item}>Поставщик</div>
          <div className={s.header__item}>Дата продажи</div>
        </div>
        {isProductsLoading
          ? "Loading"
          : (!isSalesExist ? "Продаж нет" : (filteredProducts.map((product) => {
            let saleCount = 0
            product.sales.map(sale => {
              saleCount += sale.saleCount
            })
            return (
              <Sale
                title={product.title}
                saleCount={saleCount}
                price={product.price}
                createdAt={product.createdAt}
                isProductsLoading={isProductsLoading}
                categories={product.categories}
                provider={product.provider}
              />
            )})))}

        <div className={s.header}>
          <div className={s.header__item}>Итого</div>
          <div className={s.header__item}>{sumSaleCount}</div>
          <div className={s.header__item}>{sumPrice.toFixed(2)}</div>
          <div className={s.header__item}></div>
          <div className={s.header__item}></div>
          <div className={s.header__item}></div>
        </div>
      </div>
      <button onClick={saveReportInFile}>Сохранить отчёт в файл</button>
    </div>
  );
}

export default SalesList;
