import React, { useEffect } from "react";
import s from "./SalesSidebar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByCategory,
  filterByDate,
  filterByProvider,
} from "../../redux/slices/products";
import { fetchProviders } from "../../redux/slices/providers";

function SalesSidebar(props) {
  const dispatch = useDispatch();
  const [category, setCategory] = React.useState("");
  const [checkCategory, setCheckCategory] = React.useState("");

  const [provider, setProvider] = React.useState("");
  const [checkProvider, setCheckProvider] = React.useState("");

  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  const { providers } = useSelector((state) => state.providers);
  const isProvidersLoading = providers.status === "loading";

  const categoriesArray = [
    "Научная литература",
    "Программирование",
    "Предпринимательская деятельность",
    "Дизайн и искусство",
    "Языки",
    "Зарубежная литература",
    "Право",
  ];

  const onDateFilter = () => {
    dispatch(filterByDate({ startDate: startDate, endDate: endDate }));
  };

  const handleChangeCategory = (e) => {
    if (e.target.checked) {
      setCategory(e.target.value);
      setCheckCategory(true);
    } else {
      setCategory(e.target.value);
      setCheckCategory(false);
    }
  };

  const handleChangeProvider = (e) => {
    if (e.target.checked) {
      setProvider(e.target.value);
      setCheckProvider(true);
    } else {
      setProvider(e.target.value);
      setCheckProvider(false);
    }
  };

  useEffect(() => {
    dispatch(filterByCategory({ value: category, checked: checkCategory }));
  }, [category, checkCategory]);

  useEffect(() => {
    dispatch(filterByProvider({ value: provider, checked: checkProvider }));
  }, [provider, checkProvider]);

  useEffect(() => {
    dispatch(fetchProviders());
  }, []);

  return (
    <div className={s.block__wrapper}>
      <div>
        <h2>Период</h2>
        <span>От: </span>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <span>До: </span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={onDateFilter}>Искать</button>
      </div>
      <div>
        <h2>Категории</h2>
        {categoriesArray.map((category) => {
          return (
            <div>
              <input
                type="checkbox"
                id="category"
                name={category}
                value={category}
                onChange={handleChangeCategory}
              />
              <label for="category">{category}</label>
            </div>
          );
        })}
      </div>
      <div>
        <h2>Поставщики</h2>
        {isProvidersLoading
          ? "Loading"
          : providers.items.data.map((provider) => {
              return (
                <div>
                  <input
                    type="checkbox"
                    id="provider"
                    name={provider.providerName}
                    value={provider.providerName}
                    onChange={handleChangeProvider}
                  />
                  <label for="provider">{provider.providerName}</label>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default SalesSidebar;
