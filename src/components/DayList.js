import React from "react";
import DayListItem from "./DayListItem";

//Component that represents the list of days
export default function DayList(props) { 

  const dayListItem = props.days.map( (day, index) => 
    <DayListItem 
      key={index} 
      name={day.name} 
      spots={day.spots} 
      selected={day.name === props.day} 
      setDay={props.setDay}  
    />);

  //Render each dayList item
  return (
    <ul>
      {dayListItem}
    </ul> 
  );
}