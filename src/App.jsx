import React, {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import {Link, Navigate} from "react-router-dom";

import "./App.scss";

import Login from "./Pages/Login/Login";

import {Provider, useDispatch, useSelector} from "react-redux";
import {fetchAuthMe, selectIsAuth} from "./redux/slices/auth";

import SalesChart from "./Pages/SalesChart/SalesChart";
import Users from "./Pages/Users/Users.tsx";
import Supplies from "./Pages/Supplies/Supplies.tsx";
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
  HighlightOutlined,
  ExportOutlined
} from "@ant-design/icons";
import HeaderContainer from "./Components/Header/Header";
import {Breadcrumb, Layout, Menu, theme} from "antd";
import store from "./redux/store.ts";
import ContentManagement from "./Pages/ContentManagement/ContentManagement";
import Orders from "./Pages/Orders/Orders";
import FullOrder from "./Pages/FullOrder/FullOrder";
import SalesSidebar from "./Components/SalesSidebar/SalesSidebar";

const {Header, Content, Footer, Sider} = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(<Link to="/products">Товары</Link>, "1", <FileOutlined/>),
  getItem(
    <Link to="/admin/analysis">Анализ продаж</Link>,
    "2",
    <AreaChartOutlined/>
  ),
  getItem(
    <Link to="/admin/sales">Продажи</Link>,
    "3",
    <ShoppingCartOutlined/>
  ),
  getItem(<Link to="/stocks">Товарные запасы</Link>, "4", <TableOutlined/>),
  getItem(<Link to="/orders">Заказы</Link>, "5", <HistoryOutlined/>),
  getItem(<Link to="/admin/orders">Возвраты товаров</Link>, "6", <ExportOutlined/>),
  getItem(<Link to="/supplies">Поставки</Link>, "7", <InboxOutlined/>),
  getItem(
    <Link to="/admin/add-supply">Собрать поставку</Link>,
    "8",
    <ClusterOutlined/>
  ),
  getItem(<Link to="/providers">Поставщики</Link>, "9", <ContactsOutlined/>),
  getItem(<Link to="/admin/users">Пользователи</Link>, "10", <TeamOutlined/>),
  getItem(<Link to="/content">Контент</Link>, "11", <HighlightOutlined/>),
];

function App() {
  const dispatch = useDispatch();
  const [isSalesSidebar, setIsSalesSidebar] = useState(false)
  const userData = useSelector((state) => state.auth);
  const [searchValue, setSearchValue] = React.useState("");

  const isAuth = useSelector(selectIsAuth);

  console.log(searchValue);

  React.useEffect(() => {
    dispatch(fetchAuthMe());

  }, []);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: {colorBgContainer, borderRadiusLG},
  } = theme.useToken();

  const location = useLocation()

  useEffect(() => {
    if (location.pathname.includes('analysis') || location.pathname.includes('sales')) {
      setIsSalesSidebar(true)
    } else {
      setIsSalesSidebar(false)
    }
  }, [location.pathname]);

  const locationNames = {
    products: "Товары",
    admin: "Администратор",
    analysis: "Аналитика",
    sales: "Продажи",
    stocks: "Товарные запасы",
    orders: "Заказы",
    supplies: "Поставки",
    "add-supply": "Собрать поставку",
    providers: "Поставщики",
    users: "Пользователи",
    content: "Управление контентом",
  }

  return (
    <Provider store={store}>
      <Layout style={{minHeight: "100vh"}}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme="light"
        >
          <div className="demo-logo-vertical"/>
          <Menu
            theme="light"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>
          <Layout>
            <Header style={{padding: 0, background: "white"}}>
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
                <Breadcrumb.Item>Главная</Breadcrumb.Item>
                {location.pathname.split('/').filter(el => el !== "").map((item) => {
                  return <Breadcrumb.Item>{locationNames[item]}</Breadcrumb.Item>
                })}

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

                    {isAuth ? (
                      <Routes>

                        <Route path="/login" element={<Login/>}/>
                        <Route path="/products" element={<AllProducts/>}/>
                        <Route path="/orders" element={<Orders/>}/>
                        <Route path="/orders/:id" element={<FullOrder/>}/>
                        <Route path="/admin/analysis" element={<SalesChart/>}/>
                        <Route path="/admin/sales" element={<SalesList/>}/>
                        <Route path="/admin/users" element={<Users/>}/>
                        <Route path="/supplies" element={<Supplies/>}/>
                        <Route path="/supplies/:id" element={<FullSupply/>}/>
                        <Route path="/providers" element={<Providers/>}/>
                        <Route path="/admin/add-supply" element={<CreateSupply/>}/>
                        <Route path="/stocks" element={<CommodityStocks/>}/>
                        <Route path="/content" element={<ContentManagement/>}/>
                      </Routes>

                    ) : (
                      <div>
                        Требуется авторизация
                        < Login/>
                      </div>
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
        {isSalesSidebar && <SalesSidebar/>}
      </Layout>
    </Provider>
  );
}

export default App;
