import React from 'react'

import "./styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form"
import useVisualMode from 'hooks/useVisualMode';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';

//Component determines which appointment version is rendered
export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  //Visual mode determines which appointment version is rendered (mode && statements below)
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

    //Call bookInterview function
    props.bookInterview(props.id, interview)
    //Once db updated, display newly created appointment
    .then(() => transition(SHOW))
    //if error updating db, display error save message
    .catch(() => transition(ERROR_SAVE, true));
  };

  //When button clicked to delete appointment, prompt user to confirm delete
  function deleteInterviewPrompt() {
    //Show confirm component 
    transition(CONFIRM);
  };

  //If the user presses confirm in confirm component, actually do delete the appointment
  function deleteInterviewConfirm() {

    //Show deleteing icon while we wait for server response
    transition(DELETING, true);

    //Wait on server response for deleting the interview object in the db
    props.cancelInterview(props.id)
    //Once updated, display empty for that timeslot
    .then(() => transition(EMPTY))
    //if error, display error delete message
    .catch(() => transition(ERROR_DELETE, true));
  };
  
  return (
    
    <article className="appointment">

      <Header time={props.time} />
      {/* Only one of the following is displayed, depending on the mode which is set by the transition() function */}
      { mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      { mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleteInterviewPrompt}
          onEdit={() => transition(EDIT)}
        />
      )}
      { mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back()} onSave={save}  /> }
      { mode === SAVING && <Status message="Saving" /> }
      { mode === DELETING && <Status message="Deleting" /> }
      { mode === CONFIRM && <Confirm message="Are you sure you want to delete?" onCancel={() => back()} onConfirm={deleteInterviewConfirm} />}
      { mode === EDIT && <Form 
                          interviewers={props.interviewers} 
                          onCancel={() => back()} 
                          onSave={save} 
                          name={props.interview.student} 
                          interviewer={props.interview.interviewer.id}
                        />
                      }
      { mode === ERROR_SAVE && <Error message= "Could not save appointment" onClose={() => back()} /> } 
      { mode === ERROR_DELETE && <Error message= "Could not delete appointment" onClose={() => back()} /> }

    </article>
  );

};
