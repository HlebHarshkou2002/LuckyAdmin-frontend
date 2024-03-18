import React from "react";
import s from "./StocksProducs.module.scss";
import { fetchProducts, searchByTitle } from "../../redux/slices/products";
import { useDispatch, useSelector } from "react-redux";
import StockProduct from "./StockProduct/StockProduct";

function StocksProducts() {
  let products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);

  const isProductsLoading = status === "loading";

  return (
    <div>
      <div className={s.sales__wrapper}>
        <div className={s.header}>
          <div className={s.header__item}>Наименование товара</div>
          <div className={s.header__item}>Остаток(Шт)</div>
          <div className={s.header__item}>Остаток(BYN)</div>
          <div className={s.header__item}>Себестоимость(BYN)</div>
          <div className={s.header__item}>Поставщик</div>
          <div className={s.header__item}>Товарный запас(Дн)</div>
        </div>
        {isProductsLoading
          ? "Loading"
          : products.map((product) => {
              return (
                <StockProduct
                  title={product.title}
                  storeCount={product.storeCount}
                  price={product.price}
                  deliveryPrice={product.deliveryPrice}
                  providerName={product.provider.providerName}
                  saleCount = {product.saleCount}
                />
              );
            })}

        <div className={s.header}>
          <div className={s.header__item}>Итого</div>
          <div className={s.header__item}></div>
          <div className={s.header__item}></div>
          <div className={s.header__item}></div>
          <div className={s.header__item}></div>
          <div className={s.header__item}></div>
        </div>
      </div>
    </div>
  );
}

export default StocksProducts;
