import React, { useEffect, useState } from "react";
import s from "./SalesSidebar.module.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  filterByCategory,
  filterByDate,
  filterByProvider,
} from "../../redux/slices/products";
import { fetchProviders } from "../../redux/slices/providers";

import { DatePicker, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Flex, Tooltip } from "antd";

const categoriesArray = [
  "Научная литература",
  "Программирование",
  "Предпринимательская деятельность",
  "Дизайн и искусство",
  "Языки",
  "Зарубежная литература",
  "Право",
];
const { RangePicker } = DatePicker;

function SalesSidebar(props) {
  
  const dispatch = useDispatch();

  const [category, setCategory] = React.useState("");
  const [checkCategory, setCheckCategory] = React.useState("");

  const [provider, setProvider] = React.useState("");
  const [checkProvider, setCheckProvider] = React.useState("");

  //Методы для работы с датой
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  const onChangeDate = (date, dateString) => {
    setStartDate(dateString[0]);
    setEndDate(dateString[1]);
  };

  const { providers } = useSelector((state) => state.providers);
  const isProvidersLoading = providers.status === "loading";

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
        <div>
          <h2>Период</h2>
          {/* <Space direction="vertical">
            <DatePicker onChange={onChangeStartDate} placeholder="Начало периода"/>
          </Space>
          <Space direction="vertical">
            <DatePicker onChange={onChangeEndDate} placeholder="Конец периода"/>
          </Space> */}
          <Space direction="vertical" size={12}>
            <RangePicker onChange={onChangeDate}/>
          </Space>
          <Flex gap="small" vertical>
            <Flex wrap="wrap" gap="small">
              <Button type="primary" icon={<SearchOutlined />} onClick={onDateFilter}>
                Search
              </Button>
            </Flex>
          </Flex>
          {/* <button onClick={onDateFilter}>Искать</button> */}
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
    </div>
  );
}

export default SalesSidebar;
