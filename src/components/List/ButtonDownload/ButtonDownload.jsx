import React from "react";
import s from "./ButtonDownload.module.scss"

function ButtonDownload() {
    const onButtonDownload = () => {

    }
    return (
        <div onClick={onButtonDownload} className={s.button}>
            <div className={s.button_title}>Download</div>
        </div>
    )
}

export default ButtonDownload;