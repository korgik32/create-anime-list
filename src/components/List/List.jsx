import React from "react";
import ButtonRemove from "./ButtonRemove/ButtonRemove";
import s from "./List.module.scss";
import ListItem from "./ListItem/ListItem"
function List() {
    return (
        <main className={s.main}>
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ButtonRemove />
        </main>
    )
}

export default List;