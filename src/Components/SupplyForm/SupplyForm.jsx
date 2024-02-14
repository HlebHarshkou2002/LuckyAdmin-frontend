import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProviders } from "../../redux/slices/providers";
import axios from "../../redux/axios";

function SupplyForm(props) {
  const dispatch = useDispatch();
  const { providers } = useSelector((state) => state.providers);

  const [title, setTitle] = React.useState("");
  const [dateOfDelivery, setDateOfDelivery] = React.useState("");
  const [comments, setComments] = React.useState("");
  const [providerId, setProviderId] = React.useState("");

  const isProvidersLoading = providers.status === "loading";

  const onSubmit = async () => {
    try{
        let products = props.productsId
        const fields = {
            title,
            dateOfDelivery,
            comments,
            products,
            providerId,

        }
        console.log(fields)
        const {data } = await axios.post('/supplies', fields);
        if(data) {
            alert("Поставка оформлена!")
        }
    } catch(err) { 
        console.log(err)
    }
}


  React.useEffect(() => {
    const providers = dispatch(fetchProviders());
  }, []);

  return (
    <div>
      <div>
        <span>Введите название поставки: </span>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <span>Выберите дату поставки: </span>
        <input
          type="date"
          value={dateOfDelivery}
          onChange={(e) => setDateOfDelivery(e.target.value)}
        />
      </div>
      <div>
        <span>Комментарий: </span>
        <input
          type="text"
          placeholder="comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </div>
      <div>
        <span>Выберите поставщика: </span>
        <select name="" id="" onChange={e => setProviderId(e.target.value)}>
          {isProvidersLoading
            ? "Loading"
            : providers.items.data.map((provider) => {
                return (
                  <option value={provider._id}>{provider.providerName}</option>
                );
              })}
        </select>
      </div>
      <div>
        <button type="submit" onClick={onSubmit}>
          Оформить поставку
        </button>
      </div>
    </div>
  );
}

export default SupplyForm;
