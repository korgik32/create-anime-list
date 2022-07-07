import React, { useCallback, useContext, useEffect, useState } from "react";
import { Context } from "../ListItem";
import s from "./Anime.module.scss"

function Anime({ poster, self }) {
    const context = useContext(Context);
    //при клипе на любое другое место кроме текущего аниме убирает кнопку удаления
    const handler = (event) => {
        let AnimeElement = event.currentTarget.current;
        AnimeElement.previousSibling.style.height = "0%";
        AnimeElement.previousSibling.style.width = "0%";
        AnimeElement = null;
        event.currentTarget.removeEventListener("click", handler, true)

    }
    const onAnime = (event) => {
        const target = event.currentTarget.firstChild;
        target.style.height = "30%";
        target.style.width = "45%";
        const clickWatcher = document;
        clickWatcher.addEventListener("click", handler, true)
        clickWatcher.current = event.target;
    }
    const onDelete = () => {
        let data;
        context.setAnimeList(data = context.animeList.filter(elem =>
            elem.title !== self.title
        ))
        const color = context.color, rankValue = context.rankValue;
        context.updateStorage(context.id, { data, rankValue, color })
    }

    return (
        <section onClick={onAnime} className={s.anime}>
            <img onClick={onDelete} className={s.anime__close} src={"/img/ListItem/animeDelete.svg"} alt="delete"></img>
            <img className={s.anime__poster} src={poster} alt="image" />
        </section>
    )
}

export default Anime;