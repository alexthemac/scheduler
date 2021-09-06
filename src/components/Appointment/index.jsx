import React, { Fragment, useEffect } from 'react'
import axios from "axios";



import "./styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form"
import useVisualMode from 'hooks/useVisualMode';
import Status from 'components/Appointment/Status';


export default function Appointment(props) {

  // console.log("PROPSSSSS",props.appointments.length);

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //Pass to form component to save info entered into form
  function save(name, interviewer) {
    //New interview object created when save is clicked
    const interview = {
      student: name,
      interviewer
    };

    //Switch to saving icon while we await server response
    transition(SAVING);


    //Wait on server response for updating the interivew object in the db
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW));



    
    
    ///ALTERNATIVE WAY TO PROMISE FOR save: ADD async in front of function bookInterview. (also in front of function save)
    // //Wait on server response for updating the interivew object in the db
    // let response = await props.bookInterview(props.id, interview)
    
    // //Once we recieve response, transition to show the new appointment
    // if (response) {
    //   transition(SHOW)
    // };
  }

  return (
    
    <article className="appointment">
      <Header time={props.time} />
      {/* DEPRECATED, SEE BELOW FOR REPLACEMENT */}
      {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />} */}
      { mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      { mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {/* {mode === CREATE && <Form interviewers={[]} /> } */}
      { mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save}  /> }
      { mode === SAVING && <Status /> }

    </article>
  );

};
