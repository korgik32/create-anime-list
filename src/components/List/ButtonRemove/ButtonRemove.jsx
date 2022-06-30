import React from "react";
import s from "./ButtonRemove.module.scss"

function ButtonRemove() {
    const onButtonRemove = () => {

    }
    return (
        <div onClick={onButtonRemove} className={s.button}>
            <div className={s.button_title}>Remove</div>
        </div>
    )
}

export default ButtonRemove;