import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSupplies } from "../../redux/slices/supplies";
import Supply from "./Supply/Supply.jsx";

function Supplies() {
  const dispatch = useDispatch();
  const { supplies } = useSelector((state) => state.supplies);

  const isSuppliesLoading = supplies.status === "loading";
  console.log(supplies);

  React.useEffect(() => {
    const supplies = dispatch(fetchSupplies());
  }, []);

  return (
    <div>
      {isSuppliesLoading
        ? "Loading"
        : supplies.items.data.map((supply) => {
            return (
              <Supply
                id={supply._id}
                title={supply.title}
                dateOfDelivery={supply.dateOfDelivery}
                providerName={supply.provider.providerName}
                supplyStatus={supply.supplyStatus}
              />
            );
          })}
    </div>
  );
}

export default Supplies;
