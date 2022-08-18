import React from "react";
import s from "./Header.module.scss";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className={s.header}>
      <div className={s.header__title}>
        <Link to={"/"}>
          Create Your Anime List
        </Link>
        <img src="/img/Header/glare.svg" alt="glare" />
      </div>
      <nav className={s.header__nav}>
        <ul>
          <li>
            <Link
              className={s.link}
              to={"/"}>
              Home
            </Link>
          </li>
          <li>
            <Link
              className={s.link}
              to={"/instruction"}>
              Instruction
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
