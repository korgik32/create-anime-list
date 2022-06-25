import React, { useState } from "react";
import Search from "../Search/Search";
import s from "./ListItem.module.scss";

function ListItem() {
    const [searchState, setSeacthState] = useState(false)
    const onSearch = (event) => {
        if (event.target.className == s.item__search) {
            searchState ?
                event.target.style.backgroundImage = 'url("/img/Search/open.svg")'
                :
                event.target.style.backgroundImage = 'url("/img/Search/close.svg")'
            setSeacthState(!searchState);
        }
    }
    //Наведение через обработчик потому что hover срабатывает на родительском элементе
    const onSearchOver = (event) => {
        if (event.target.className == s.item__search) {
            event.target.style.backgroundSize = "32%";
        }
    }
    const onSearchOut = (event) => {
        if (event.target.className == s.item__search) {
            event.target.style.backgroundSize = "30%";
        }
    }
    return (
        <section className={s.list__item}>
            <input className={s.item__rank} placeholder="rank"></input>
            <div className={s.item__field}></div>
            <div
                className={s.item__search}
                onClick={onSearch}
                onMouseOver={onSearchOver}
                onMouseOut={onSearchOut}
            >
                {searchState && <Search />}
            </div>

        </section >
    );
}

export default ListItem;