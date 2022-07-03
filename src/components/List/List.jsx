import React, { createContext, useEffect, useState } from "react";
import ButtonAdd from "./ButtonAdd/ButtonAdd";
import ButtonDownload from "./ButtonDownload/ButtonDownload";
import s from "./List.module.scss";
import ListItem from "./ListItem/ListItem"

export const ListContext = createContext()

function List() {
    const [listCount, setListCount] = useState([]);

    const loadStorage = () => {
        for (let index = 0; index < localStorage.length; index++) {
            const key = localStorage.key(index)
            setListCount((prev) => [...prev, key]);
        }
    }
    useEffect(() => {
        loadStorage()
    }, [])
    return (
        <ListContext.Provider value={{ listCount, setListCount }}>
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