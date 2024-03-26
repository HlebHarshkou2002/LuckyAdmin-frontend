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
      <table className={s.sales__wrapper} border="1" bordercolor="#f0f0f0">
        <tr className={s.header}>
          <th className={s.header__item}>Наименование товара</th>
          <th className={s.header__item}>Остаток(Шт)</th>
          <th className={s.header__item}>Остаток(BYN)</th>
          <th className={s.header__item}>Себестоимость(BYN)</th>
          <th className={s.header__item}>Поставщик</th>
          <th className={s.header__item}>Товарный запас(Дн)</th>
        </tr>
        {isProductsLoading
          ? "Loading"
          : products.map((product) => {
              return (
                <StockProduct
                  title={product.title}
                  storeCount={product.storeCount}
                  price={product.price}
                  deliveryPrice={product.deliveryPrice}
                  providerName={product.provider?.providerName}
                  saleCount = {product.saleCount}
                />
              );
            })}

        <tr className={s.header}>
          <th className={s.header__item}>Итого</th>
          <th className={s.header__item}></th>
          <th className={s.header__item}></th>
          <th className={s.header__item}></th>
          <th className={s.header__item}></th>
          <th className={s.header__item}></th>
        </tr>
      </table>
    </div>
  );
}

export default StocksProducts;
