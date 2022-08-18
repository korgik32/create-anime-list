import React, { useContext, } from "react";
import { useState } from "react";
import { Context } from "../ListItem";
import s from "./Search.module.scss";
import MyLoader from "./MyLoader/MyLoader";

function Search() {
  const [noData, setNoData] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [image, setImage] = useState('');
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const addAnime = (anime) => {
    if (context.animeListCompare(anime))
      alert("You already added this anime");
    else
      context.setAnimeList((prev) => [...prev, anime]);
  };
  /* const parse = () => {
    let temp = translated;
    temp = temp.replace(/ /g, "-");
  }; */
  const onEnter = async (event) => {
    if (searchValue != "") {
      setNoData(true)
      setLoading(true);
      const encodedParams = new URLSearchParams();
      encodedParams.append("q", searchValue);
      encodedParams.append("target", "en");
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
      await fetch("https://google-translate1.p.rapidapi.com/language/translate/v2", options)
        .then((response) => response.json())
        .then((response) =>
          animeRequest(response.data.translations[0].translatedText)
        )
        .catch((err) => {
          animeRequest(searchValue);
        })
        .catch((err) => {
          alert("search error")
        })

    }
  };
  const onClear = (event) => {
    setSearchValue("");
    setNoData(true);
  }

  const animeRequest = async (words) => {
    await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${words}`, {
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json'
      }
    }
    )
      .then(response => response.json())
      .then(result => {
        setTitle(result.data[0].attributes.titles[Object.keys(result.data[0].attributes.titles)[0]]);//первое свойство в обьекте titles
        setImage(result.data[0].attributes.posterImage.large);
        setNoData(false)
      })
      .catch(err => {
        alert("anime search error")
        setNoData(true);
      })
    setLoading(false)
  }

  return (
    <section className={s.search}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
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
              setSearchValue(event.target.value);
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
              padding: "3px 10px 3px 10px",
            }}
            onMouseOver={(event) =>
              (event.target.style.backgroundColor = "#addbf0")
            }
            onMouseOut={(event) =>
              (event.target.style.backgroundColor = "transparent")
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
            {!noData ?
              <>
                <p>{title}</p>
                <img
                  src={image}
                  alt='anime image'
                />
              </>
              :
              loading
                ?
                <MyLoader style={{ marginTop: "50%" }} />
                :
                <p style={{ marginTop: "50%" }}>Find something...</p>
            }

          </div>
        </div>
        {!noData
          &&
          <>
            <div className={s.ok}>
              <img
                src='/img/Search/ok.svg'
                alt='ok'
                onClick={() => {
                  addAnime({
                    title: title,
                    poster: image,
                  });
                }}
                onMouseOver={(event) => {
                  event.target.src =
                    "/img/Search/ok-hover.svg";
                }}
                onMouseOut={(event) => {
                  event.target.src = "/img/Search/ok.svg";
                }}
              />
            </div>
            <div className={s.no}>
              <img
                src='/img/Search/no.svg'
                alt='no'
                onClick={onClear}
                onMouseOver={(event) => {
                  event.target.src = "/img/Search/no-hover.svg";
                }}
                onMouseOut={(event) => {
                  event.target.src = "/img/Search/no.svg";
                }}
              />
            </div>
          </>
        }
      </div>
    </section>
  );
}

export default Search;
