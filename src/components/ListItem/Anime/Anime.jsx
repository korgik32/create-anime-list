import React from "react";
import s from "./Anime.module.scss"

function Anime({ poster }) {
    return (
        <div className={s.anime}>
            <img src={poster} alt="image" />
        </div>
    )
}

export default Anime;