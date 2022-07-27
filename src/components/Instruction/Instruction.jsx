import React from "react";
import s from "./Instruction.module.scss";
import InstructionItem from "./InstructionItem/InstructionItem";

function Instruction() {
  const dndText = `You can drag an element to another tier.`;
  return (
    <div className={s.instruction}>
      <InstructionItem
        text={dndText}
        screenshot='/img/Instruction/dnd.png'
      />
    </div>
  );
}

export default Instruction;
