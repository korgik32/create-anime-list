import React, { useContext, useEffect } from "react";
import Context from "../../../Context";
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
        target.style.width = "50%";
        const clickWatcher = document;
        clickWatcher.addEventListener("click", handler, true)
        clickWatcher.current = event.target;
    }
    const onDelete = () => {
        let data;
        context.setAnimeList(data = context.animeList.filter(elem =>
            elem.title !== self.title
        ))
        context.updateStorage(0, data)
    }

    return (
        <section onClick={onAnime} className={s.anime}>
            <div onClick={onDelete} className={s.anime__close}></div>
            <img src={poster} alt="image" />
        </section>
    )
}

export default Anime;