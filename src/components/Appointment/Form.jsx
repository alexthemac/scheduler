import React, { useState } from 'react' //useState is different from the other .jsx files because we are worried about states now

import Button from "../Button";
import InterviewerList from "components/InterviewerList";



export default function Form (props) {

  //If there is a student name, set initial state to student name (edit appointment), if not leave blank (create new appointment)
  const [name, setName] = useState(props.name || "");
  //If there is an interviewer, set initial state to interviewer (edit appointment), if not leave blank (create new appointment)
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

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

            /*
              This must be a controlled component
            */
          />
        </form>
        <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => props.onSave(name, interviewer)}>Save</Button>
        </section>
      </section>
    </main>
  );
}