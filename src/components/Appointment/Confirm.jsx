import React from "react";

import Button from "../Button";

export default function Confirm(props) {

  const { message, onConfirm, onCancel } = props;

  const cancel = function() {
    props.onCancel();
  }

  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button danger onClick={onConfirm}>Confirm</Button>
      </section>
    </main>
  );
}