import React, { useContext } from "react";
import s from "../ButtonRemove/ButtonRemove.module.scss"
import { ListContext } from "../List";

function ButtonAdd() {
    const context = useContext(ListContext)
    const onButtonAdd = () => {
        let keysArray = [], maxKey;
        for (let index = 0; index < localStorage.length; index++) {
            keysArray.push(localStorage.key(index));
        }
        maxKey = Math.max(...keysArray);
        context.setListCount((prev) => [...prev, maxKey !== -Infinity ? Number(maxKey + 1) : 0])
        localStorage.setItem(maxKey !== -Infinity ? Number(maxKey + 1) : 0, JSON.stringify([]));
    }
    return (
        <div onClick={onButtonAdd} className={s.button}>
            <div className={s.button_title}>Add</div>
        </div>
    )
}

export default ButtonAdd;