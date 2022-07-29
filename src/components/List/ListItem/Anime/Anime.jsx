import React, {
  useCallback,
  useContext,
  useRef,
} from "react";
import { createElement } from "react";
import { useState } from "react";
import { ListContext } from "../../List";
import { Context } from "../ListItem";
import s from "./Anime.module.scss";

function Anime({ poster, self }) {
  const context = useContext(Context);
  const contextFromList = useContext(
    ListContext
  );
  const animeRef = useRef(null);
  const documentRef = useRef(document);
  /* let shiftX, shiftY; */
  const [shiftX, setShiftX] =
    useState(null);
  const [shiftY, setShiftY] =
    useState(null);
  //при клипе на любое другое место кроме текущего аниме убирает кнопку удаления
  const handler = (event) => {
    let AnimeElement = document.current;
    console.log(
      documentRef.current.current
    );
    AnimeElement.previousSibling.style.height =
      "0%";
    AnimeElement.previousSibling.style.width =
      "0%";
    documentRef.current.current = null;
    document.removeEventListener(
      "click",
      handler,
      true
    );
  };

  const onAnime = (event) => {
    const target =
      event.currentTarget.firstChild;
    target.style.height = "30%";
    target.style.width = "45%";
    document.addEventListener(
      "click",
      handler,
      true
    );
    document.current = event.target;
  };
  const onDelete = () => {
    /* let data;
        context.setAnimeList(data = context.animeList.filter(elem =>
            elem.title !== self.title
        ))
        context.updateStorage(context.id, { data, rankValue: context.rankValue, color: context.color }) */

    context.deleteAnime(self);
    document.removeEventListener(
      "click",
      handler,
      true
    );
  };

  const dragStartHandler = (event) => {
    context.setCurrentCard(self);
    context.setFromListItem(context.id);
  };

  const dradEndHandler = (event) => {
    if (
      context.intoListItem != context.id
    )
      context.deleteAnime(
        context.currentCard
      );
    setTimeout(() => {
      context.setCurrentCard("");
    }, 0);
  };
  const dradOverHandler = (event) => {
    event.preventDefault();
  };

  const dropHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div
      onClick={onAnime}
      className={s.anime}
      ref={animeRef}
      draggable
      onDragStart={dragStartHandler}
      onDragEnd={dradEndHandler}
      onDragOver={dradOverHandler}
      onDrop={dropHandler}>
      <img
        onClick={onDelete}
        className={s.anime__close}
        src={
          "/img/List/ListItem/animeDelete.svg"
        }
        alt='delete'></img>
      <img
        className={s.anime__poster}
        src={poster}
        alt='image'
      />
    </div>
  );
}

export default Anime;
