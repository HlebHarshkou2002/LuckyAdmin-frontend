import React, { useEffect, useState } from "react";
import s from "./SalesSidebar.module.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  filterByCategory,
  filterByDate,
  filterByProvider,
} from "../../redux/slices/products";
import { fetchProviders } from "../../redux/slices/providers";

import { DatePicker, Space, ConfigProvider } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Flex, Tooltip } from "antd";
import { Typography } from "antd";
import { Checkbox } from "antd";
import {
  AppstoreOutlined,
  FieldTimeOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

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
const { Title } = Typography;

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

  let providers = useSelector((state) => state.providers.providers);
  let status = useSelector((state) => state.providers.status);
  const isProvidersLoading = status === "loading";

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

  if (!isProvidersLoading) {
    providers = providers.map((provider) => {
      return getItem(
        <Checkbox value={provider.providerName} onChange={handleChangeProvider}>
          {provider.providerName}
        </Checkbox>,
        provider.providerName
      );
    });
  } else {
    providers = [getItem("Loading", "loading")];
  }

  const items = [
    getItem("Период", "sub1", <FieldTimeOutlined />, [
      getItem(
        <div>
          <Space direction="vertical" size={12} className={s.date__input}>
            <RangePicker onChange={onChangeDate} />
          </Space>
        </div>,
        "g1"
      ),
      getItem(
        <div>
          <Flex gap="small" vertical>
            <Flex wrap="wrap" gap="small">
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={onDateFilter}
              >
                Поиск
              </Button>
            </Flex>
          </Flex>
        </div>
      ),
    ]),
    {
      type: "divider",
    },
    getItem(
      "Категории",
      "sub2",
      <AppstoreOutlined />,
      categoriesArray.map((category) => {
        return getItem(
          <Checkbox value={category} onChange={handleChangeCategory}>
            {category}
          </Checkbox>,
          category
        );
      })
    ),
    {
      type: "divider",
    },
    getItem("Поставщики", "sub3", <TeamOutlined />, providers),
  ];

  return (
    <div className={s.block__wrapper}>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemHoverBg: "#fafafa",
              itemSelectedBg: "#fafafa",
            },
          },
        }}
      >
        <Menu
          style={{
            width: 256,
          }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          inlineIndent={0}
          items={items}
        />
      </ConfigProvider>
    </div>
  );
}

export default SalesSidebar;
