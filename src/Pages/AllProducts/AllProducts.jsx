import React from "react";
import s from './AllProducts.module.scss'

import AdminProducts from "../../Components/AdminProducts/AdminProducts";
import AddProduct from "../../Components/AddProduct/AddProduct";

function AllProducts() {
    return(
        <div className={s.all__products__block}>
            <AdminProducts />
            <AddProduct />
        </div>
    )
}

export default AllProducts;