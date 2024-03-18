import React from "react";
import s from "./CommodityStocks.module.scss";
import StocksProducts from "../../Components/StocksProducts/StocksProducts";
import SaleBoard from "../../Components/SaleBoard/SaleBoard";

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/products";

function CommodityStocks() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const status = useSelector((state) => state.products.status);
  let products = useSelector((state) => state.products.products);

  const isProductsLoading = status === "loading";

  let sumSalesCount = 0;
  let sumStoreCount = 0;
  let sumStoreCountPrice = 0;
  if (!isProductsLoading) {
    products.map((product) => {
      sumSalesCount += product.saleCount;
      sumStoreCountPrice += product.saleCount * product.price;
      sumStoreCount += product.storeCount;
    });
  }

  return (
    <div>
      <div className={s.dashboard}>
        <SaleBoard
          title="Остаток, шт"
          value={sumStoreCount}
          calculation={"Шт"}
        />
        <SaleBoard
          title="Остаток, руб"
          value={sumStoreCountPrice}
          calculation={"BYN"}
        />
        <SaleBoard
          title="Товарный запас, дн"
          value={Math.floor((sumStoreCount * 30) / sumSalesCount)}
          calculation={"Дн"}
        />
        <SaleBoard
          title="Дней в периоде, дн"
          value={30}
          calculation={"Дн"}
        />
      </div>
      <StocksProducts />
    </div>
  );
}

export default CommodityStocks;
