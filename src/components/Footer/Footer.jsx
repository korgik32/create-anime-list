import React from "react";
import s from "./Footer.module.scss"

function Footer() {
    return (
        <footer className={s.footer}>
            <div className={s.linksList}>
                <ul>
                    <li>
                        <a href="">Telegram</a>
                    </li>
                    <li>
                        <a href="">GitHub</a>
                    </li>
                    <li>
                        <a href="">Email</a>
                    </li>
                    <li>
                        <a href="">VK</a>
                    </li>
                </ul>
            </div>
            <div className={s.image}>
                <a href="">
                    <img src="/img/Footer/telegram.svg" alt="Telegram" />
                </a>
            </div>
            <div className={s.image}>
                <a href="">
                    <img src="/img/Footer/github.svg" alt="GitHub" />
                </a>
            </div>
            <div className={s.image}>
                <a href="">
                    <img src="/img/Footer/email.svg" alt="Email" />
                </a>
            </div>
            <div className={s.image}>
                <a href="">
                    <img src="/img/Footer/vk.svg" alt="VK" />
                </a>

            </div>

        </footer>
    )
}

export default Footer;