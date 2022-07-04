import React, { createContext, useEffect, useState } from "react";

import ButtonAdd from "./ButtonAdd/ButtonAdd";
import ButtonDownload from "./ButtonDownload/ButtonDownload";
import s from "./List.module.scss";
import ListItem from "./ListItem/ListItem"

export const ListContext = createContext()

function List() {
    const [listCount, setListCount] = useState([]);
    const compare = (a, b) => {
        if (Number(a) > Number(b)) return 1; // если первое значение больше второго
        if (Number(a) == Number(b)) return 0; // если равны
        if (Number(a) < Number(b)) return -1; // если первое значение меньше второго
    }
    const loadStorage = () => {
        let keysArray = [];
        for (let index = 0; index < localStorage.length; index++) {
            const key = localStorage.key(index)
            keysArray.push(key)
        }
        setListCount(keysArray.sort(compare));
    }
    useEffect(() => {
        loadStorage()
    }, [])
    return (
        <ListContext.Provider value={{ listCount, setListCount, compare }}>
            <main className={s.main}>
                {listCount.map((elem, index) =>
                    <ListItem key={index} id={elem} />
                )
                }
                <div className={s.buttons}>
                    <ButtonAdd className={s.button__add} />
                    <ButtonDownload className={s.button__download} />
                </div>

            </main>
        </ListContext.Provider>
    )
}

export default List;