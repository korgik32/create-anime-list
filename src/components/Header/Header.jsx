import React from "react";
import s from "./Header.module.scss"

function Header() {

    return (
        <header className={s.header}>
            <div className={s.header__title}>Create Your Anime List</div>
            <div className={s.header__image}></div>
        </header>
    )
}
export default Header;