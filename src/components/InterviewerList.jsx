import React from "react";

import './InterviewerList.scss'
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList (props) {

  const { interviewers, interviewer, setInterviewer} = props;

  const interviewerListItem = interviewers.map( (interviewer) => 
    <InterviewerListItem
      key={interviewer.id}

      //Destructure the interviewer object (one of the objects in interviewers)
      //quick way to assign each key value pair as a new props, ie id={interviewer.id}, name={interviewer.name} etc..
      {...interviewer}

      //compare the interviewer prop value to the interviewer objects id 
      selected={props.interviewer === interviewer.id}

      setInterviewer={() => setInterviewer(interviewer.id)}
     /> 
      )

  return (
    <section className="interviewers" >
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerListItem}
      </ul>
    </section>
  );
}