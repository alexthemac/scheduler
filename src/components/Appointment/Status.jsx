import React from "react";

//Component shown when saving or deleting as it transitions from form to show or vice versa
export default function Status(props) {

  return (

    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{props.message}</h1>
    </main>

  );
}