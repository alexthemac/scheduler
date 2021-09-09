import React from "react";

import Button from "../Button";

//Component shown when user tries to delete existing appointment
export default function Confirm(props) {

  //Destructure props object so we can call them by name vs props.name
  const { message, onConfirm, onCancel } = props;

  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={onCancel}>Cancel</Button>
        <Button danger onClick={onConfirm}>Confirm</Button>
      </section>
    </main>
  );
}