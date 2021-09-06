import React from "react";
import './InterviewerListItem.scss';

var classNames = require('classnames'); //require to use classNames as opposed to multiple different if statemetns

export default function InterviewerListItem(props) {

  //destructure props so we can call them by their name
  const { id, name, avatar, selected, setInterviewer } = props; 

  //Set the class based on if they are selected or not
  let interviewerClass = classNames ( 'interviewers__item', { 'interviewers__item--selected' : selected })

  return (
      //call the setInterviewer function when clicked 
      //only works for stories that pass the setInterviewer props, in this case only clickable story does
      <li onClick={setInterviewer} className={interviewerClass}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      /> 
      {/* Only display name for story with selected prop */}
      {selected ? name : ''}
    </li>
  );
}

