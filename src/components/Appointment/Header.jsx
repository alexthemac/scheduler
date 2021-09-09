import React from "react";

//Component shown on all interview spots (booked or not)
export default function Header (props) {
  
  //Destructure props object so we can call them by name vs props.name
  const { time } = props;

  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{time}</h4>
      <hr className="appointment__separator" />
    </header>
  );
}