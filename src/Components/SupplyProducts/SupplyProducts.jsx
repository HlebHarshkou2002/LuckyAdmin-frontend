import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SupplyProduct from "./SupplyProduct/SupplyProduct";
import s from "./SupplyProducts.module.scss"
import { fetchProducts } from "../../redux/slices/products";


function SupplyProducts(props) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);

  const isProductsLoading = status === "loading";

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className={s.products__block}>
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
    </div>
  );
}

export default SupplyProducts;