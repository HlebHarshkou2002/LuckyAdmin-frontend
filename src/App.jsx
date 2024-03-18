import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";

import "./App.scss";

import Login from "./Pages/Login/Login";

import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";

import SalesChart from "./Pages/SalesChart/SalesChart";
import Users from "./Pages/Users/Users";
import Supplies from "./Pages/Supplies/Supplies";
import FullSupply from "./Pages/FullSupply/FullSupply";
import Providers from "./Pages/Providers/Providers";
import CreateSupply from "./Pages/CreateSupply/CreateSupply";
import AllProducts from "./Pages/AllProducts/AllProducts";
import SalesList from "./Pages/SalesList/SalesList";
import CommodityStocks from "./Pages/CommodityStocks/CommodityStocks";

import {
  FileOutlined,
  TeamOutlined,
  AreaChartOutlined,
  ShoppingCartOutlined,
  TableOutlined,
  InboxOutlined,
  HistoryOutlined,
  ClusterOutlined,
  ContactsOutlined,
} from "@ant-design/icons";

import HeaderContainer from "./Components/Header/Header";

import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(<Link to="/products">Товары</Link>, "1", <FileOutlined />),
  getItem(
    <Link to="/admin/analysis">Анализ продаж</Link>,
    "2",
    <AreaChartOutlined />
  ),
  getItem(
    <Link to="/admin/sales">Продажи</Link>,
    "3",
    <ShoppingCartOutlined />
  ),
  getItem(<Link to="/stocks">Товарные запасы</Link>, "4", <TableOutlined />),
  getItem(<Link to="/admin/orders">Заказы</Link>, "5", <HistoryOutlined />),
  getItem(<Link to="/supplies">Поставки</Link>, "6", <InboxOutlined />),
  getItem(
    <Link to="/admin/add-supply">Собрать поставку</Link>,
    "7",
    <ClusterOutlined />
  ),
  getItem(<Link to="/providers">Поставщики</Link>, "8", <ContactsOutlined />),
  getItem(<Link to="/admin/users">Пользователи</Link>, "9", <TeamOutlined />),
];

function App() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth);
  const [searchValue, setSearchValue] = React.useState("");

  const isAuth = useSelector(selectIsAuth);

  console.log(searchValue);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme="light"
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="light"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: "white" }}>
            <HeaderContainer
              email={userData.data?.email}
              fullName={userData.data?.fullName}
            />
          </Header>

          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <Breadcrumb
              style={{
                margin: "16px 0",
              }}
            >
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <div className="App">
                <div className="container">
                  {/* <Header
              email={userData.data?.email}
            /> */}
                  {isAuth ? (
                    <Routes>
                      <Route path="/login" element={<Login />} />

                      {/* Admin */}
                      {/* <Route path="/" element={<AdminPanel />} /> */}
                      <Route path="/products" element={<AllProducts />} />
                      <Route path="/admin/analysis" element={<SalesChart />} />
                      <Route path="/admin/sales" element={<SalesList />} />
                      <Route path="/admin/users" element={<Users />} />
                      <Route path="/supplies" element={<Supplies />} />
                      <Route path="/supplies/:id" element={<FullSupply />} />
                      <Route path="/providers" element={<Providers />} />
                      <Route
                        path="/admin/add-supply"
                        element={<CreateSupply />}
                      />
                      <Route path="/stocks" element={<CommodityStocks />} />
                    </Routes>
                  ) : (
                    "Требуется авторизация"
                  )}
                </div>
              </div>
            </div>
          </Content>
          
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Lucky ©{new Date().getFullYear()} Created by Gleb Gorshkov
          </Footer>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
