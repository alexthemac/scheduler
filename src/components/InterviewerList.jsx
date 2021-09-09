import React from "react";
import PropTypes from 'prop-types';

import './InterviewerList.scss'
import InterviewerListItem from "./InterviewerListItem";

//Component that represents the list of interviewers (appears when creating or editing an interview)
function InterviewerList (props) {

  const { interviewers, setInterviewer} = props;

  //Modify the interviewers array to contain html
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

//Check using proptypes that we are getting correct prop (no error thrown becuase we expect it to be array)
//If changed to PropTypes.string.isRequired tjen error is thrown
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;