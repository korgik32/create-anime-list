import React, { createContext, useEffect, useState, } from "react";
import ButtonAdd from "./ButtonAdd/ButtonAdd";
import ButtonDownload from "./ButtonDownload/ButtonDownload";
import s from "./List.module.scss";
import ListItem from "./ListItem/ListItem";
import {
  ranksArray,
  colorsArray,
} from "../../dataArrays";
import html2canvas from "html2canvas";

export const ListContext = createContext();

function List() {
  const [listCount, setListCount] = useState([]);
  const [currentCard, setCurrentCard] = useState("");
  const [fromListItem, setFromListItem] = useState(null);
  const [intoListItem, setIntoListItem] = useState(null);
  const [dragStatus, setDragStatus] = useState(false);
  const compare = (a, b) => {
    if (Number(a) > Number(b)) return 1; // если первое значение больше второго
    if (Number(a) == Number(b))
      return 0; // если равны
    if (Number(a) < Number(b))
      return -1; // если первое значение меньше второго
  };
  const loadStorage = () => {
    let keysArray = [];
    if (localStorage.length > 0) {
      for (let index = 0; index < localStorage.length; index++) {
        const key = localStorage.key(index);
        keysArray.push(key);
        setListCount(keysArray.sort(compare));
      }
    } else {
      for (let index = 0; index < 3; index++) {
        localStorage.setItem(index, null);
      }
    }

  };
  useEffect(() => {
    loadStorage();
  }, []);

  return (
    <ListContext.Provider
      value={{
        listCount,
        setListCount,
        compare,
        currentCard,
        setCurrentCard,
        dragStatus,
        setDragStatus,
      }}>
      <main className={s.main}>
        <div className={s.mainInfo}>
          <div className={s.info}>
            Create an anime list! The
            list of anime allows you to
            consider and classify anime.
            All that you watched can be
            noted in your sheet.
          </div>
          <section
            className={s.infoPhone}>
            If you are using a mobile
            device, then flip it for
            easy use.
            <img
              draggable={false}
              src='/img/List/rotate.svg'
              alt='rotate'
            />
          </section>
        </div>
        <div className="sex">
          {listCount.map(
            (elem, index) => {
              return (
                <ListItem
                  key={Number(elem)}
                  id={Number(elem)}
                  placeholder={ranksArray[index]}
                  defaultColor={colorsArray[index]}
                  currentCard={currentCard}
                  setCurrentCard={setCurrentCard}
                  fromListItem={fromListItem}
                  setFromListItem={setFromListItem}
                  intoListItem={intoListItem}
                  setIntoListItem={setIntoListItem}
                />
              );
            }
          )}
        </div>
        <div className={s.buttons}>
          <ButtonAdd className={s.button__add} />
          <ButtonDownload className={s.button__download} />
        </div>
      </main>
    </ListContext.Provider>
  );
}

export default List;
