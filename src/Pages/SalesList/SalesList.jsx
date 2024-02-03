import React from "react";
import Sale from "./Sale/Sale";
import s from "./SalesList.module.scss";

function SalesList(props) {
  let objArray = JSON.parse(JSON.stringify(props.salesData));

  //Считаем сколько раз повторяются товары в продажах
  objArray.forEach((element) => {
    element.saleCount = 0;
    for (let item of props.salesData) {
      if (element.title === item.title) {
        element.saleCount += 1;
      }
    }
  });

  //Надо переписать для объектов, чтобы оставались только уникальные обьекты
  // const makeUniq = (arr) => {
  //     return arr.filter((el, id) => arr.indexOf(el) === id)
  // }
  const getUniqueOptions = (options) => {
    return options.reduce(
      (res, cur) =>
        res.find(
          (find) => JSON.stringify(find.title) === JSON.stringify(cur.title)
        )
          ? res
          : [...res, cur],
      []
    );
  };

  const resultArray = getUniqueOptions(objArray);
  let sumSalesCount = 0;
  let sumPrice = 0;
  resultArray.map(el => {
    sumSalesCount += el.saleCount 
    sumPrice += el.price 
  })

  return (
    <div className={s.sales__wrapper}>
      <div className={s.header}>
        <div className={s.header__item}>Наименование товара</div>
        <div className={s.header__item}>Шт</div>
        <div className={s.header__item}>Сумма (BYN)</div>
        <div className={s.header__item}>Покупатель</div>
        <div className={s.header__item}>Дата продажи</div>
      </div>
      {resultArray.map((sale) => (
        <Sale
          title={sale.title}
          saleCount={sale.saleCount}
          price={sale.price}
          createdAt={sale.createdAt}
          user={sale.user}
        />
      ))}

      <div className={s.header}>
        <div className={s.header__item}>Итого</div>
        <div className={s.header__item}>{sumSalesCount}</div>
        <div className={s.header__item}>{sumPrice.toFixed(2)}</div>
        <div className={s.header__item}></div>
        <div className={s.header__item}></div>
      </div>
    </div>
  );
}

export default SalesList;
