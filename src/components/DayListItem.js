import React from "react";
import './DayListItem.scss';

var classNames = require('classnames'); //require to use classNames as opposed to multiple different if statemetns

export default function DayListItem(props) {

  let dayClass = classNames( 'day-list__item', { 'day-list__item--selected' : props.selected, 'day-list__item--full' : props.spots === 0 });

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
  
    <li onClick={() => props.setDay(props.name)} className={dayClass} >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}