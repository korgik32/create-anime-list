import React from "react";
import s from "./Search.module.scss"

function Search() {
    return (
        <section className={s.search}>
            <div className={s.search__string} type="text" placeholder="Search...">
                <img src='/img/Search/search.svg' alt="search"></img>
                <input placeholder="search..."></input>
            </div>
            <div className={s.search__result}>
                <div className={s.result__image}>
                    <div>
                        <p>cowboy</p>
                        <img src="https://avatars.mds.yandex.net/get-kinopoisk-image/1629390/b9215827-6d1e-4418-ac0a-fa892a651b0c/orig" alt="anime image" />
                    </div>

                </div>
                <div className={s.ok}>
                    <img
                        src="/img/Search/ok.svg"
                        alt="ok"
                        onMouseOver={(event) => { event.target.src = "/img/Search/ok-hover.svg" }}
                        onMouseOut={(event) => { event.target.src = "/img/Search/ok.svg" }}
                    />
                </div>
                <div className={s.no}>
                    <img
                        src="/img/Search/no.svg"
                        alt="no"
                        onMouseOver={(event) => { event.target.src = "/img/Search/no-hover.svg" }}
                        onMouseOut={(event) => { event.target.src = "/img/Search/no.svg" }}
                    />
                </div>

            </div>

        </section>
    );
}

export default Search;