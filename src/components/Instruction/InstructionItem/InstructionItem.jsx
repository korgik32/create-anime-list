import React from "react";
import s from "./InstructionItem.module.scss"

function InstructionItem({ text, screenshot }) {
    return (
        <div className={s.instructionItem}>
            <section className={s.iSection}>
                <img src={screenshot} alt="" className={s.iSection__img} />
                <div className={s.isection__div}>{text}</div>
            </section>
        </div>
    )
}

export default InstructionItem;