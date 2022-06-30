import React, { useEffect, useState, createContext } from "react";
import Search from "./Search/Search";
import s from "./ListItem.module.scss";
import Anime from "./Anime/Anime";

export const Context = createContext();

function ListItem() {
    const [searchState, setSeacthState] = useState(false)
    const [animeList, setAnimeList] = useState([])
    useEffect(() => {
        loadStorage(0);
    }, [])
    //автодобавление в хранилище при изменении списка
    useEffect(() => {
        animeList.length && updateStorage(0, animeList)
    }, [animeList])
    const updateStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    }

    const loadStorage = (key) => {
        let data = localStorage.getItem(key);
        data = JSON.parse(data)
        data && setAnimeList(data)
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
    const animeListCompare = (anime) => {
        return animeList.find(elem =>
            anime.title === elem.title
        )
    }
    //функция которая убирает кнопку удаления аниме в <Animes/>


    return (
        <Context.Provider value={{
            setAnimeList, animeList, animeListCompare,
            updateStorage,
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