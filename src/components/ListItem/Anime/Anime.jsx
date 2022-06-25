import React, { useContext } from "react";
import Context from "../../../Context";
import s from "./Anime.module.scss"

function Anime({ poster, self }) {
    const context = useContext(Context)
    const onAnime = (event) => {
        let target = event.currentTarget.firstChild;
        target.style.height = "30%";
        target.style.width = "50%"
    }
    const onClose = (event) => {
        let a = context.setAnimeList(context.animeList.filter(elem =>
            elem.title !== self.title
        ))

    }
    return (
        <form onClick={onAnime} className={s.anime}>
            <div onClick={onClose} className={s.anime__close}></div>
            <img src={poster} alt="image" />
        </form>
    )
}

export default Anime;