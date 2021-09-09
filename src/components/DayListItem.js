import React from "react";
import './DayListItem.scss';

var classNames = require('classnames'); //require to use classNames as opposed to multiple different if statements

//Component that represents a single day
export default function DayListItem(props) {

  //Determines look of day (if day is currently selected or not, changes className based on this and thus appearance)
  let dayClass = classNames( 'day-list__item', { 'day-list__item--selected' : props.selected, 'day-list__item--full' : props.spots === 0 });

  //Fix displayed text grammar depending on how many spots remaining
  const formatSpots = () => {
    if (props.spots > 1) {
      return `${props.spots} spots remaining`  
    }
    if (props.spots === 1) {
      return `${props.spots} spot remaining`  
    }
    if (props.spots === 0) {
      return `no spots remaining`
    }
  };

  return (
  
    <li onClick={() => props.setDay(props.name)} className={dayClass} data-testid='day' >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}