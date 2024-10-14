import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SupplyProduct from "./SupplyProduct/SupplyProduct";
import s from "./SupplyProducts.module.scss";
import { fetchProducts } from "../../redux/slices/products";

function SupplyProducts(props) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);

  const isProductsLoading = status === "loading";

  React.useEffect(() => {
    const limit = 100;
    const page = 1;
    const paginationObj = {
      limit,
      page
    }
    dispatch(fetchProducts(paginationObj));
  }, []);

  return (
    <table className={s.products__block} border="1" bordercolor="#f0f0f0">
      <tr className={s.header}>
        <th className={s.header__item}>Наименование товара</th>
        <th className={s.header__item}>Отпускная цена(BYN)</th>
        <th className={s.header__item}>Остаток(Шт)</th>
        <th className={s.header__item}>Категория</th>
        <th className={s.header__item}>Кол-во заказа(Шт)</th>
        <th className={s.header__item}>Цена поставки на товар(BYN)</th>
        <th className={s.header__item}>Добавить в поставку</th>
      </tr>
      {isProductsLoading
        ? "Loading"
        : products.map((product) => {
            return (
              <SupplyProduct
                id={product._id}
                title={product.title}
                price={product.price}
                storeCount={product.storeCount}
                categories={product.categories}
                userName={product.user?.fullName}
                description={product.description}
                author={product.author}
                ageRestriction={product.ageRestriction}
                imgUrl={product.imgUrl}
                complexity={product.complexity}
                rating={product.rating}
                products={props.products}
              />
            );
          })}
    </table>
  );
}

export default SupplyProducts;
