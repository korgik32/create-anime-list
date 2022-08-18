import React, { useEffect, useState, createContext, useContext, } from "react";
import Search from "./Search/Search";
import s from "./ListItem.module.scss";
import Anime from "./Anime/Anime";
import { ListContext } from "../List";
import ListSettings from "./Settings/ListSettings";
import stylesFromSearch from "./Search/Search.module.scss";
import stylesFromSettings from "./Settings/ListSettings.module.scss";

export const Context = createContext();

function ListItem({
  id,
  placeholder,
  defaultColor,
  currentCard,
  setCurrentCard,
  fromListItem,
  setFromListItem,
  intoListItem,
  setIntoListItem,
}) {
  const [searchState, setSeacthState] = useState(false);
  const [settingsState, setSettingsState,] = useState(false);
  const [color, setColor] = useState("");
  const [animeList, setAnimeList] = useState([]);
  const [rankValue, setRankValue] = useState("");
  const context = useContext(ListContext);
  //автодобавление в хранилище при изменении списка
  function update() {
    updateStorage(id, {
      animeList,
      rankValue,
      color,
    });
  }
  useEffect(() => {
    animeList.length && update();
  }, [animeList]);
  useEffect(() => {
    rankValue.length && update();
  }, [rankValue]);
  useEffect(() => {
    color != defaultColor &&
      color != "" &&
      update();
  }, [color]);
  useEffect(() => {
    loadStorage(id);
  }, []);
  const updateStorage = (
    key,
    value
  ) => {
    localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  };
  const loadStorage = (key) => {
    let data =
      localStorage.getItem(key);
    data = JSON.parse(data);
    data &&
      data.animeList &&
      setAnimeList(data.animeList);
    data &&
      data.rankValue &&
      setRankValue(data.rankValue);
    if (data && data.color) {
      setColor(data.color);
    } else {
      setColor(defaultColor);
    }
  };
  const onCloseSearch = (event) => {
    if (
      event.target.className == s.item__search ||
      event.target.className == stylesFromSearch.close
    ) {
      searchState
        ? (event.currentTarget.style.backgroundImage =
          'url("/img/Search/open.svg")')
        : (event.currentTarget.style.backgroundImage =
          'url("/img/Search/close.svg")');
      setSeacthState(!searchState);
    }
  };
  const onCloseSettings = (event) => {
    if (
      event.currentTarget.className == s.list__settings || event.target.className == stylesFromSettings.close
    ) {
      setSettingsState(!settingsState);
    }
  };
  //Наведение через обработчик потому что hover срабатывает на родительском элементе
  const onSearchOver = (event) => {
    if (
      event.target.className == s.item__search
    ) {
      event.target.style.backgroundSize = "32%";
    }
  };
  const onSearchOut = (event) => {
    if (
      event.target.className == s.item__search
    ) {
      event.target.style.backgroundSize = "30%";
    }
  };
  const deleteAnime = (anime) => {
    let data;
    setAnimeList(
      (data = animeList.filter(
        (elem) =>
          elem.title !== anime.title
      ))
    );
    updateStorage(id, {
      data,
      rankValue: rankValue,
      color: color,
    });
  };
  const animeListCompare = (anime) => {
    return animeList.find(
      (elem) =>
        anime.title === elem.title
    );
  };
  const deleteAnimeList = () => {
    if (
      window.confirm("Delete element??")
    ) {
      let keysArray = [];
      setAnimeList([]);
      localStorage.removeItem(id);
      keysArray =
        context.listCount.filter(
          (elem) => elem != id
        );
      context.setListCount(
        keysArray.sort(context.compare)
      );
    }
  };
  const onDropHandler = (event) => {
    event.preventDefault();
    //если запихиваемая штука не является аниме карточкой то не надо
    if (currentCard != "") {
      setIntoListItem(id);
      if (fromListItem == id) {
      } else if (
        animeListCompare(currentCard)
      )
        alert(
          "You already added this anime"
        );
      else {
        setAnimeList((prev) => [...prev, currentCard,]);
      }
    }
  };

  return (
    <Context.Provider
      value={{
        setAnimeList,
        animeList,
        animeListCompare,
        updateStorage,
        id,
        onCloseSearch,
        onCloseSettings,
        color,
        rankValue,
        setColor,
        currentCard,
        setCurrentCard,
        fromListItem,
        setFromListItem,
        deleteAnime,
        intoListItem,
        setIntoListItem,
      }}>
      <section className={s.list__item}>
        <div
          className={s.list__delete}
          onClick={deleteAnimeList}>
          <img
            src='/img/List/ListItem/animeList-delete.svg'
            alt='delete'
          />
        </div>
        <div
          className={s.list__settings}
          onClick={onCloseSettings}>
          <img
            src='/img/List/ListItem/settings.svg'
            alt='settings'
          />
        </div>
        <input
          className={s.item__rank}
          style={{
            background: `${color}`,
          }}
          value={rankValue}
          onChange={(event) => {
            setRankValue(
              event.target.value
            );
          }}
          placeholder={
            placeholder
          }></input>
        <div
          className={s.item__field}
          draggable={false}
          onDrop={onDropHandler}
          onDragOver={(event) => {
            event.preventDefault();
          }}>
          {animeList?.map(
            (elem) => (
              <Anime
                key={elem.title}
                poster={elem.poster}
                self={elem}
              />
            )
          )}
        </div>
        <div
          className={s.item__search}
          onClick={onCloseSearch}
          onMouseOver={onSearchOver}
          onMouseOut={onSearchOut}>
          {searchState && <Search />}
          {settingsState && (
            <ListSettings />
          )}
        </div>
      </section>
    </Context.Provider>
  );
}

export default ListItem;
