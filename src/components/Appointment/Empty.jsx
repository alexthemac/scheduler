import React from "react";

//Component shown when no appointment exists for this timeslot (interview: null in appointments object)
export default function Empty (props) {

  //Destructure props object so we can call them by name vs props.name
  const { onAdd } = props;

  return (
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={onAdd}
      />
    </main>
  );
}