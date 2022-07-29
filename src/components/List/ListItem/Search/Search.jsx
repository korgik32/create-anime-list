import React, {
  useContext,
} from "react";
import { useState } from "react";
import { Context } from "../ListItem";
import s from "./Search.module.scss";

function Search() {
  const [] = useState("");
  const [searchValue, setSearchValue] =
    useState("");
  const [translated, setTrandlated] =
    useState("");
  const context = useContext(Context);
  const addAnime = (anime) => {
    if (context.animeListCompare(anime))
      alert(
        "Вы уже добавили это аниме"
      );
    else
      context.setAnimeList((prev) => [
        ...prev,
        anime,
      ]);
  };
  const parse = () => {
    let temp = translated;
    temp = temp.replace(/ /g, "-");
    //если пробел не один
    setTrandlated(temp);
    /*     console.log(temp); */
  };
  const onEnter = async (event) => {
    if (searchValue != "") {
      const encodedParams =
        new URLSearchParams();
      encodedParams.append(
        "q",
        searchValue
      );
      encodedParams.append(
        "target",
        "en"
      );
      const options = {
        method: "POST",
        headers: {
          "content-type":
            "application/x-www-form-urlencoded",
          "Accept-Encoding":
            "application/gzip",
          "X-RapidAPI-Key":
            "478227f6d5msh66283d014e61af5p14fa8cjsnc43cb5780a47",
          "X-RapidAPI-Host":
            "google-translate1.p.rapidapi.com",
        },
        body: encodedParams,
      };
      await fetch(
        "https://google-translate1.p.rapidapi.com/language/translate/v2",
        options
      )
        .then((response) =>
          response.json()
        )
        .then((response) =>
          setTrandlated(
            response.data
              .translations[0]
              .translatedText
          )
        )
        .catch((err) =>
          console.error(err)
        );
      parse();
    }
  };

  return (
    <section className={s.search}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent:
            "space-around",
        }}>
        <div
          className={s.search__string}
          type='text'
          placeholder='Search...'>
          <img
            src='/img/Search/search.svg'
            alt='search'></img>
          <input
            value={searchValue}
            onChange={(event) => {
              setSearchValue(
                event.target.value
              );
            }}
            placeholder='search...'
            onKeyDown={(event) => {
              if (event.key == "Enter")
                onEnter(event);
            }}></input>
          <img
            src='/img/Search/enter.svg'
            alt='enter'
            style={{
              margin: "0px 5px 0px 0px",
              borderRadius: "3px",
              padding:
                "3px 10px 3px 10px",
            }}
            onMouseOver={(event) =>
              (event.target.style.backgroundColor =
                "#addbf0")
            }
            onMouseOut={(event) =>
              (event.target.style.backgroundColor =
                "transparent")
            }
            onClick={onEnter}
          />
        </div>
        <img
          src='/img/Search/arrow.svg'
          className={s.close}
          alt='close'
        />
      </div>
      <div className={s.search__result}>
        <div
          className={s.result__image}>
          <div>
            <p>cowboy bebop</p>
            <img
              src='https://i.pinimg.com/736x/d6/7c/af/d67cafc9096ce9afea6c9fd00b5bb093.jpg'
              alt='anime image'
            />
          </div>
        </div>
        <div className={s.ok}>
          <img
            src='/img/Search/ok.svg'
            alt='ok'
            onClick={() => {
              addAnime({
                title: "cowboy",
                poster:
                  "https://i.pinimg.com/736x/d6/7c/af/d67cafc9096ce9afea6c9fd00b5bb093.jpg",
              });
            }}
            onMouseOver={(event) => {
              event.target.src =
                "/img/Search/ok-hover.svg";
            }}
            onMouseOut={(event) => {
              event.target.src =
                "/img/Search/ok.svg";
            }}
          />
        </div>
        <div className={s.no}>
          <img
            src='/img/Search/no.svg'
            alt='no'
            onMouseOver={(event) => {
              event.target.src =
                "/img/Search/no-hover.svg";
            }}
            onMouseOut={(event) => {
              event.target.src =
                "/img/Search/no.svg";
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default Search;
