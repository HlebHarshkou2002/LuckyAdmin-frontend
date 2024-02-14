import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SupplyProduct from "./SupplyProduct/SupplyProduct";
import s from "./SupplyProducts.module.scss"
import { fetchAdminProducts } from "../../redux/slices/adminProducts";

function SupplyProducts(props) {
  const dispatch = useDispatch();
  const { products, genres } = useSelector((state) => state.adminProducts);

  const isProductsLoading = products.status === "loading";

  React.useEffect(() => {
    dispatch(fetchAdminProducts());
  }, []);

  return (
    <div className={s.products__block}>
      {isProductsLoading
        ? "Loading"
        : products.items.data.map((product) => {
            return (
              <SupplyProduct
                id={product._id}
                title={product.title}
                price={product.price}
                genres={product.genres}
                userName={product.user?.fullName}
                description={product.description}
                author={product.author}
                ageRestriction={product.ageRestriction}
                imgUrl={product.imgUrl}
                complexity={product.complexity}
                rating={product.rating}
                productsId={props.productsId}
              />
            );
          })}
    </div>
  );
}

export default SupplyProducts;
