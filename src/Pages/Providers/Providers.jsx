import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProvider, fetchProviders } from "../../redux/slices/providers";
import s from "./Providers.module.scss";
import Provider from "./Provider/Provider";
import axios from "../../redux/axios";

import { Input } from "antd";
import { Select } from "antd";
import { Button, Flex } from "antd";
import { notification, Space } from "antd";

function Providers() {
  const [providerName, setProviderName] = useState("");
  const [providerStatus, setProviderStatus] = useState("");
  const [email, setEmail] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [workingConditions, setWorkingConditions] = useState("");

  const dispatch = useDispatch();
  const providers = useSelector((state) => state.providers.providers);
  const status = useSelector((state) => state.providers.status);

  const isProvidersLoading = status === "loading";

  console.log(providers);

  React.useEffect(() => {
    const providers = dispatch(fetchProviders());
  }, []);

  const [api, contextHolder] = notification.useNotification();
  const openNotificationCreate = (type) => {
    api[type]({
      message: "Выполнено!",
      description: "Поставщик успешно добавлен!",
    });
  };

  const onSubmit = async () => {
    try {
      const fields = {
        providerName,
        providerStatus,
        email,
        contactPerson,
        workingConditions,
      };
      console.log(fields);
      const { data } = await axios.post("/providers", fields);
      if (data) {
        openNotificationCreate("success");
        dispatch(addProvider({ fields: fields }));
      }
    } catch (err) {
      alert("Не удалось добавить поставщика!")
      console.log(err);
    }
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <div className={s.providers__block}>
      {contextHolder}
      <table className={s.sales__wrapper} border="1" bordercolor="#f0f0f0">
        <tr className={s.header}>
          <th className={s.header__item}>Наименование поставщика</th>
          <th className={s.header__item}>Контактное лицо</th>
          <th className={s.header__item}>Почта для связи</th>
          <th className={s.header__item}>Статус</th>
          <th className={s.header__item}>Частота поставки</th>
        </tr>
        {isProvidersLoading
          ? "Loading"
          : providers.map((provider) => {
              return <Provider provider={provider} />;
            })}
      </table>
      <div className={s.add__provider}>
        <div>
          <Input
            type="text"
            placeholder="Название поставщика"
            name="providerName"
            value={providerName}
            onChange={(e) => setProviderName(e.target.value)}
          />
        </div>
        <div>
          <Select
            showSearch
            placeholder="Выберите статус"
            optionFilterProp="providerStatus"
            filterOption={filterOption}
            options={[
              {
                label: "Работаем",
                value: true,
              },
              {
                label: "Приостановлен",
                value: false,
              },
            ]}
            name="providerStatus"
            onChange={(value) => setProviderStatus(value)}
            className={s.select__status}
          />
        </div>
        <div>
          <Input
            type="text"
            placeholder="E-mail"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Input
            type="text"
            placeholder="Контактное лицо"
            name="contactPerson"
            value={contactPerson}
            onChange={(e) => setContactPerson(e.target.value)}
          />
        </div>
        <div>
          <Input
            type="text"
            placeholder="Условия поставок"
            name="workingConditions"
            value={workingConditions}
            onChange={(e) => setWorkingConditions(e.target.value)}
          />
        </div>
        <div>
          <Flex gap="small" wrap="wrap">
            <Button type="primary" onClick={onSubmit} size="large">
              Добавить поставщика
            </Button>
          </Flex>
        </div>
      </div>
    </div>
  );
}

export default Providers;
