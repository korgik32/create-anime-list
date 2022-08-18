import React from "react";
import s from "./Footer.module.scss"

function Footer() {
    return (
        <footer className={s.footer}>
            <div className={s.linksList}>
                <ul>
                    <li>
                        <a href="https://t.me/korgik32">Telegram</a>
                    </li>
                    <li>
                        <a href="https://github.com/korgik32">GitHub</a>
                    </li>
                    <li>
                        <a href="mailto:mishahero@mail.ru">Email</a>
                    </li>
                    <li>
                        <a href="https://vk.com/korgik173332">VK</a>
                    </li>
                </ul>
            </div>
            <div className={s.image}>
                <a href="https://t.me/korgik32">
                    <img src="/img/Footer/telegram.svg" alt="Telegram" />
                </a>
            </div>
            <div className={s.image}>
                <a href="https://github.com/korgik32">
                    <img src="/img/Footer/github.svg" alt="GitHub" />
                </a>
            </div>
            <div className={s.image}>
                <a href="mailto:mishahero@mail.ru">
                    <img src="/img/Footer/email.svg" alt="Email" />
                </a>
            </div>
            <div className={s.image}>
                <a href="https://vk.com/korgik173332">
                    <img src="/img/Footer/vk.svg" alt="VK" />
                </a>

            </div>

        </footer>
    )
}

export default Footer;