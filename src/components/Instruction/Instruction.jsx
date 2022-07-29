import React from "react";
import s from "./Instruction.module.scss";
import InstructionItem from "./InstructionItem/InstructionItem";

function Instruction() {
  const dndText = `You can drag an element to another tier.`;
  const addText = `To add an item, click the Add button.`;
  const changeRankText = `You can change the name of the rank by clicking on it and typing a new one.`;
  const changeColorText = `If you do not like the color, then change it by clicking on settings -> change color.`;
  const deleteText = `To delete an element, you can click on the red mark.`;
  const deleteAnimeText = `To Remove an anime from the list, you need to click on the anime card, then
   click on the button that appears.`;
  return (
    <div className={s.instruction}>
      <InstructionItem
        text={deleteAnimeText}
        screenshot='/img/Instruction/deleteAnime.png'
      />
      <InstructionItem
        text={dndText}
        screenshot='/img/Instruction/dnd.png'
      />
      <InstructionItem
        text={addText}
        screenshot='/img/Instruction/add.png'
      />
      <InstructionItem
        text={changeColorText}
        screenshot='/img/Instruction/changeColor.png'
      />
      <InstructionItem
        text={changeRankText}
        screenshot='/img/Instruction/changeRank.png'
      />
      <InstructionItem
        text={deleteText}
        screenshot='/img/Instruction/delete.png'
      />
    </div>
  );
}

export default Instruction;
