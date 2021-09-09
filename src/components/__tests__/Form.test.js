//Jest tests (testing Form functionality)
import React from "react";

import { render, cleanup, fireEvent } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(<Form interviewers={interviewers} />);
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} name="Lydia Miller-Jones" />
    );
    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });

  it("validates that the student name is not blank", () => {
    // Create the mock onSave function
    const onSave = jest.fn();
  
    //Render the Form with interviewers and the onSave mock function passed as an onSave prop, the name prop should be blank or undefined
    const { getByText } = render(
      <Form 
        interviewers={interviewers} 
        onSave={onSave} 
        name=""
      /> 
    );

    //Click the save button
    fireEvent.click(getByText("Save"));
  
    //expect "student name cannot be blank" to be shown when save button clicked
    //and no name is present in the text input field 
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("can succesfully save after trying to submit an empty student name", () => {
    //Create mock save function
    const onSave = jest.fn();

    //Render the form
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );
    
    //Fire click event on item in DOM that has "Save"
    fireEvent.click(getByText("Save"));
    
    //Try to save with empty name (expect text in getByText to be shown and onSave function not to have been called)
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();

    //Change text to an actual name
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: {value: "Lydia Miller-Jones"}
    });

    //Fire click event on item in DOM that has "Save"
    fireEvent.click(getByText("Save"));

    //Expect text in queryByText to not be present as there is a name now
    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    //onSave function should have been called once and name parameter should have argument of "Lydia Miller-Jones"
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });

  it("calls onCancel and resets the input field", () => {
    //Creates mock cancel function
    const onCancel = jest.fn();

    //Render the form
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );
  
    //Fire click event on item in DOM that has "Save"
    fireEvent.click(getByText("Save"));

    //Fire event to change name to Lydia Miller-Jones from Lydia Mill-Jones
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });

    //Fire click event on item in DOM that has "Cancel"
    fireEvent.click(getByText("Cancel"));
  
    //Expect text in queryByText to not be present as there is a name now
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    //Expect there to be no Enter Student Name 
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  
    //Expect cancel to be clicked once
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

});





