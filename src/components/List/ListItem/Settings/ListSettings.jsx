import React, { useContext, useState } from "react";
import { Context } from "../ListItem";
import s from "./ListSettings.module.scss";
function ListSettings() {
    const context = useContext(Context)
    //при удалении цвет остается тем же
    //при изменении цвета сразу после создания создается лишний элемент
    return (
        <div className={s.listSettings} onClick={context.onCloseSettings}>
            <div className={s.firstLine}>
                <div className={s.colorPickerBlock}>
                    <div>
                        Change color:
                    </div>
                    <input
                        className={s.colorPicker}
                        value={context.color}
                        onChange={(event) => { context.setColor(event.target.value) }}
                        type={"color"}>
                    </input>
                </div>
                <img
                    src="/img/Search/arrow.svg"
                    className={s.close}
                    alt="close" />

            </div>
        </div>
    )
}

export default ListSettings;