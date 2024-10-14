import React from "react";
import s from './AllProducts.module.scss'

import AdminProducts from "../../Components/Products/Products";
import AddProduct from "../../Components/AddProduct/AddProduct";



function AllProducts() {
    return (
        <div>
            <div className={s.all__products__block}>
                <AdminProducts />
                <AddProduct />
            </div>
        </div>

    )
}

export default AllProducts;