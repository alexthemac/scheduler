import React, { useState } from 'react' //useState is different from the other .jsx files because we are worried about states now

import Button from "../Button";
import InterviewerList from "components/InterviewerList";



export default function Form (props) {

  //If there is a student name, set initial state to student name (edit appointment), if not leave blank (create new appointment)
  const [name, setName] = useState(props.name || "");
  //If there is an interviewer, set initial state to interviewer (edit appointment), if not leave blank (create new appointment)
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  //Error state
  const [error, setError] = useState("");

  //Reset form inputs to blank for name and non selected for interviewer
  const reset = function() {
    setName('');
    setInterviewer(null)
  };

  //When cancel button pressed, go back to previous visual state and clear student name field and selected interviewer
  const cancel = function() {
    props.onCancel();
    reset();
  };

  //Validates whether name is blank WHEN confirm button is clicked. If blank, setsError. If not blank, call onSave function.
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }

    //Set error to "" if a name is entered
    setError("");

    //If name is not blank, save via onsave function
    props.onSave(name, interviewer);
  }


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            onChange={(event) => setName(event.target.value)}
            value={name}
            data-testid="student-name-input"

            /*
              This must be a controlled component
            */
          />

        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
}