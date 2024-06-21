import React, { useEffect, useState } from "react";
import s from "./ContentManagement.module.scss"
import { ColorPicker } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { fetchShopInfo } from "../../redux/slices/shopInfo";
import axios from "../../redux/axios";

function ContentManagement() {
    const dispatch = useDispatch();
    const info = useSelector((state) => state.shopInfo.shopInfo);
    const status = useSelector((state) => state.shopInfo.status);
    const isInfoLoading = status === "loading";


    const [title, setTitle] = useState("")


    React.useEffect(() => {
        dispatch(fetchShopInfo());
        
    }, []);

    console.log(title)

    return (
        <div className={s.block}>
            {isInfoLoading ? "Loading" :

                <div>
                    <div>
                        <p>Название магазина: </p>
                        <input type="text" placeholder="Название магазина" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div>
                        <p>Описание: </p>
                        <textarea name="" id="" cols="50" rows="8"></textarea>
                    </div>
                    <div>
                        <p>Контакты: </p>
                        <input name="" id="" cols="50" rows="8"></input>
                    </div>
                    <div className={s.banners__wrapper}>
                        <p>Рекламные баннеры: </p>
                        <div className={s.banners}>
                            <div>{"title " + "text " + "btn-text " + "imgurl"} X</div>

                        </div>
                        <div className={s.create__banner}>
                            <div>
                                <input type="text" placeholder="Название баннера" />
                            </div>
                            <div>
                                <input type="text" placeholder="Описание рекламы" />
                            </div>
                            <div>
                                <input type="text" placeholder="Текст для кнопки перехода" />
                            </div>
                            <div>
                                <input type="text" placeholder="Ссылка на саму акцию" />

                            </div>
                            <button>Добавить баннер</button>

                        </div>
                    </div>
                    <div>
                        <p>Цветовая гамма магазина: </p>
                        <ColorPicker defaultValue="#1677ff" showText size="large" />
                    </div>
                    <button>Обновить информацию</button>
                </div>
            }

        </div>
    )
}

export default ContentManagement