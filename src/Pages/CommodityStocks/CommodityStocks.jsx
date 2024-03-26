import React from "react";
import s from "./CommodityStocks.module.scss";
import StocksProducts from "../../Components/StocksProducts/StocksProducts";
import SaleBoard from "../../Components/SaleBoard/SaleBoard";

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/products";

import { DollarOutlined, CalendarOutlined, AppstoreAddOutlined, BarcodeOutlined } from '@ant-design/icons';


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
          boardImg={<BarcodeOutlined style={{ fontSize: '26px'}}/>}
        />
        <SaleBoard
          title="Остаток, руб"
          value={sumStoreCountPrice}
          calculation={"BYN"}
          boardImg={<DollarOutlined style={{ fontSize: '26px'}}/>}
        />
        <SaleBoard
          title="Товарный запас, дн"
          value={Math.floor((sumStoreCount * 30) / sumSalesCount)}
          calculation={"Дн"}
          boardImg={<AppstoreAddOutlined style={{ fontSize: '26px'}}/>}
        />
        <SaleBoard
          title="Дней в периоде, дн"
          value={30}
          calculation={"Дн"}
          boardImg={<CalendarOutlined style={{ fontSize: '26px'}}/>}
        />
      </div>
      <StocksProducts />
    </div>
  );
}

export default CommodityStocks;
