import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminProduct from "./AdminProduct/AdminProduct";
import s from "./AdminProducts.module.scss"
import { fetchAdminProducts } from "../../redux/slices/adminProducts";

function AdminProducts() {
  const dispatch = useDispatch();
  const { products, genres } = useSelector((state) => state.adminProducts);

  const isProductsLoading = products.status === "loading";

  React.useEffect(() => {
    dispatch(fetchAdminProducts());
  }, []);

  console.log(products);

  return (
    <div className={s.products__wrapper}>
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
