import React, { useEffect, useState, createContext, useContext } from "react";
import Search from "./Search/Search";
import s from "./ListItem.module.scss";
import Anime from "./Anime/Anime";
import { ListContext } from "../List";
import ListSettings from "./Settings/ListSettings";
import stylesFromSearch from "./Search/Search.module.scss"
import stylesFromSettings from "./Settings/ListSettings.module.scss";


export const Context = createContext();

function ListItem({ id, placeholder, defaultColor }) {
    const [searchState, setSeacthState] = useState(false)
    const [settingsState, setSettingsState] = useState(false)
    const [color, setColor] = useState("")
    const [animeList, setAnimeList] = useState([])
    const [rankValue, setRankValue] = useState("")
    const context = useContext(ListContext)
    //автодобавление в хранилище при изменении списка
    function testing() {
        updateStorage(id, { animeList, rankValue, color });
    }
    useEffect(() => {
        animeList.length && /* updateStorage(id, { animeList, rankValue, color }) */testing()
    }, [animeList])
    useEffect(() => {
        rankValue.length && /* updateStorage(id, { animeList, rankValue, color }) */testing()

    }, [rankValue])
    useEffect(() => {
        color != defaultColor && color != "" && testing()
    }, [color])
    useEffect(() => {
        loadStorage(id);
    }, [])
    const updateStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    }
    const loadStorage = (key) => {
        let data = localStorage.getItem(key);
        data = JSON.parse(data)
        data && data.animeList && setAnimeList(data.animeList)
        data && data.rankValue && setRankValue(data.rankValue)
        if (data && data.color) {
            setColor(data.color)
        }
        else {
            setColor(defaultColor)
        }
    }
    const onCloseSearch = (event) => {
        if (event.target.className == s.item__search || event.target.className == stylesFromSearch.close) {
            searchState ?
                event.currentTarget.style.backgroundImage = 'url("/img/Search/open.svg")'
                :
                event.currentTarget.style.backgroundImage = 'url("/img/Search/close.svg")'
            setSeacthState(!searchState);
        }
    }
    const onCloseSettings = (event) => {
        if (event.currentTarget.className == s.list__settings || event.target.className == stylesFromSettings.close) {
            setSettingsState(!settingsState)
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
                elem != id
            )
            console.log(keysArray);
            context.setListCount(keysArray.sort(context.compare))
        }
    }
    return (
        <Context.Provider value={{
            setAnimeList, animeList, animeListCompare,
            updateStorage, id, onCloseSearch, onCloseSettings, color, rankValue, setColor
        }}>
            <section className={s.list__item}>
                <div className={s.list__delete} onClick={deleteAnimeList}>
                    <img src="/img/ListItem/animeList-delete.svg" alt="delete" />
                </div>
                <div className={s.list__settings} onClick={onCloseSettings}>
                    <img src="/img/ListItem/settings.svg" alt="settings" />
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
                    onClick={onCloseSearch}
                    onMouseOver={onSearchOver}
                    onMouseOut={onSearchOut}
                >
                    {searchState && <Search />}
                    {settingsState && <ListSettings />}
                </div>
            </section >
        </Context.Provider>
    );
}

export default ListItem;