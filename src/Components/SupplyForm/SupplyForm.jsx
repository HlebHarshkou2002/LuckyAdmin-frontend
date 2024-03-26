import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProviders } from "../../redux/slices/providers";
import axios from "../../redux/axios";
import s from "./SupplyForm.module.scss";

import { notification } from "antd";
import { Input } from "antd";
import { DatePicker, Space } from "antd";
import { Button, ConfigProvider } from "antd";
import { Select, Flex } from "antd";

function SupplyForm(props) {
  const dispatch = useDispatch();
  let { providers } = useSelector((state) => state.providers);

  const [title, setTitle] = React.useState("");
  const [dateOfDelivery, setDateOfDelivery] = React.useState("");
  const [comments, setComments] = React.useState("");
  const [providerId, setProviderId] = React.useState("");

  const isProvidersLoading = providers.status === "loading";

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type) => {
    api[type]({
      message: "Выполнено!",
      description: "Поставка успешно оформлена!",
    });
  };

  const onSubmit = async () => {
    try {
      let products = props.products;
      console.log(products);
      const fields = {
        title,
        dateOfDelivery,
        comments,
        products,
        providerId,
      };
      console.log(fields);
      const { data } = await axios.post("/supplies", fields);
      console.log(data);
      if (data) {
        openNotification("success");
      }
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    const providers = dispatch(fetchProviders());
  }, []);

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <div className={s.form__wrapper}>
      {contextHolder}
      <div>
        <Input
          placeholder="Введите название поставки"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <DatePicker
          onChange={(date, dateString) => setDateOfDelivery(dateString)}
          placeholder="Выберите дату поставки"
          className={s.date__picker}
        />
      </div>
      <div>
        <Input
          placeholder="Введите примечание к поставке"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </div>
      <div>
        <Select
          showSearch
          placeholder="Выберите поставщика"
          optionFilterProp="providers"
          filterOption={filterOption}
          options={
            isProvidersLoading
              ? "Loading"
              : providers.items.data.map((provider) => {
                  return {
                    value: provider._id,
                    label: provider.providerName,
                  };
                })
          }
          name="providers"
          onChange={(value) => setProviderId(value)}
        />
      </div>
      <div>
        <Flex gap="small" wrap="wrap" onClick={onSubmit}>
          <Button type="primary">Оформить поставку</Button>
        </Flex>
      </div>
    </div>
  );
}

export default SupplyForm;
