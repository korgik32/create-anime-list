import React, { useContext } from "react";
import { ListContext } from "../List";
import s from "./ButtonRemove.module.scss"

function ButtonRemove() {
    const context = useContext(ListContext)
    const onButtonRemove = () => {
        for (let index = 0; index < context.list.length; index++) {
            localStorage.removeItem(index)
        }
        context.setList(["", "", ""])
    }
    return (
        <div onClick={onButtonRemove} className={s.button}>
            <div className={s.button_title}>Remove</div>
        </div>
    )
}

export default ButtonRemove;