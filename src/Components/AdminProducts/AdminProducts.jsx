import React from "react";
import "./AdminProducts.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/products";
import AdminProduct from "./AdminProduct/AdminProduct";

function AdminProducts() {
  const dispatch = useDispatch();
  const { products, genres } = useSelector((state) => state.products);

  const isProductsLoading = products.status === "loading";

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  console.log(products);

  return (
    <div className="products__wrapper">
      {isProductsLoading
        ? "Loading"
        : products.items.data.map((product) => {
            return (
              <AdminProduct
                _id={product._id}
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
              />
            );
          })}
    </div>
  );
}

export default AdminProducts;
