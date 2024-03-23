import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product/Product";
import s from "./Products.module.scss";
import { fetchProducts } from "../../redux/slices/products";

function Products() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);

  const isProductsLoading = status === "loading";

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  console.log(products);

  return (
    <table className={s.products__wrapper} border="1" bordercolor="#f0f0f0">
      <tr className={s.header}>
        <th className={s.header__item}>Наименование товара</th>
        <th className={s.header__item}>Цена (BYN)</th>
        <th className={s.header__item}>Цена поставки (BYN)</th>
        <th className={s.header__item}>Остаток (Шт)</th>
        <th className={s.header__item}>Категории</th>
        <th className={s.header__item}>Удалить/Редактировать</th>

      </tr>
      {isProductsLoading
        ? "Loading"
        : products.map((product) => {
            return (
              <Product
                _id={product._id}
                title={product.title}
                price={product.price}
                deliveryPrice={product.deliveryPrice}
                storeCount={product.storeCount}
                categories={product.categories}
                userName={product.user?.fullName}
                description={product.description}
                author={product.author}
                ageRestriction={product.ageRestriction}
                imgUrl={product.imgUrl}
                complexity={product.complexity}
                rating={product.rating}
              />
            );
          })}
    </table>
  );
}

export default Products;
