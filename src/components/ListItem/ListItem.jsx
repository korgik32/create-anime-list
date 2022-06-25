import React, { useEffect, useState } from "react";
import Search from "../Search/Search";
import s from "./ListItem.module.scss";
import Context from "../../Context";
import Anime from "./Anime/Anime";
function ListItem() {
    const [searchState, setSeacthState] = useState(false)
    const [animeList, setAnimeList] = useState([])
    useEffect(() => {
        loadStorage(0);
    }, [])
    const addInStorage = (key, value) => {
        localStorage.setItem(0, value);
    }
    const deleteFromStorage = (key) => {
        localStorage.removeItem(key);
    }
    const loadStorage = (key) => {
        let data = localStorage.getItem("0");
        data = JSON.parse(data)
        setAnimeList(data)
    }
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
        <Context.Provider value={{
            setAnimeList, animeList,
            addInStorage, deleteFromStorage
        }}>
            <section className={s.list__item}>
                <input className={s.item__rank} placeholder="rank"></input>
                <div className={s.item__field}>
                    {animeList?.map((elem, index) =>
                        <Anime
                            key={index}
                            poster={elem.poster}
                            self={elem}
                        />
                    )}
                </div>
                <div
                    className={s.item__search}
                    onClick={onSearch}
                    onMouseOver={onSearchOver}
                    onMouseOut={onSearchOut}
                >
                    {searchState && <Search />}
                </div>
            </section >
        </Context.Provider>
    );
}

export default ListItem;