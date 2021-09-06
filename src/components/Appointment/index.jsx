import React, { Fragment } from 'react'

import "./styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form"
import useVisualMode from 'hooks/useVisualMode';


export default function Appointment(props) {

  // console.log("PROPSSSSS",props.appointments.length);

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";

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

    props.bookInterview(props.id, interview);

    transition(SHOW);
  }

  return (
    
    <article className="appointment">
      <Header time={props.time} />
      {/* DEPRECATED, SEE BELOW FOR REPLACEMENT */}
      {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} /> : <Empty />} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {/* {mode === CREATE && <Form interviewers={[]} /> } */}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save}  /> }

    </article>
  );

};
