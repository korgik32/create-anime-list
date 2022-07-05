import React, { useEffect, useState, createContext, useContext } from "react";
import Search from "./Search/Search";
import s from "./ListItem.module.scss";
import Anime from "./Anime/Anime";
import { ListContext } from "../List";


export const Context = createContext();

function ListItem({ id, placeholder, color }) {
    const [searchState, setSeacthState] = useState(false)
    const [animeList, setAnimeList] = useState([])
    const [rankValue, setRankValue] = useState("")
    const context = useContext(ListContext)
    useEffect(() => {
        loadStorage(id);
    }, [])
    //автодобавление в хранилище при изменении списка
    useEffect(() => {
        animeList.length && updateStorage(id, { animeList, rankValue })
    }, [animeList])
    useEffect(() => {
        rankValue.length && updateStorage(id, { animeList, rankValue })

    }, [rankValue])
    const updateStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    }
    const loadStorage = (key) => {
        let data = localStorage.getItem(key);
        data = JSON.parse(data)
        data && data.animeList && setAnimeList(data.animeList)
        data && data.rankValue && setRankValue(data.rankValue)
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
    const deleteAnimeList = () => {
        if (window.confirm("Удалить полоску?")) {
            let keysArray = [];
            setAnimeList([])
            localStorage.removeItem(id)
            keysArray = context.listCount.filter((elem) =>
                elem !== id
            )
            context.setListCount(keysArray.sort(context.compare))
        }
    }
    return (
        <Context.Provider value={{
            setAnimeList, animeList, animeListCompare,
            updateStorage, id
        }}>
            <section className={s.list__item}>
                <div className={s.list__delete} onClick={deleteAnimeList}>
                    <img src="/img/ListItem/animeList-delete.svg" alt="delete" />
                </div>
                <input className={s.item__rank}
                    style={{ background: `${color}` }}
                    value={rankValue}
                    onChange={(event) => { setRankValue(event.target.value) }}
                    placeholder={placeholder}>
                </input>
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