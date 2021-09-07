import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/index";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  
  //Create an array of appointments for the selected day 
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  //Create an array of interviewers for the selected day array
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  //Create new array containing an <Appointment /> component for each item in the array
  const appointmentItem = dailyAppointments.map( (appointment) => {

    const interview = getInterview(state, appointment.interview);
    
    return (
      <Appointment
      //Must include key regardless of option
      key={appointment.id}

      //option 1: pass each prop one by one:
      id={appointment.id}
      time={appointment.time}
      interview={interview} 
      interviewers={dailyInterviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}

      //DEPRECATED AS NEED TO UPDATE interview WITH INFO FROM getInterview function
      //option 2: or we can use the spread operator which does the same as above
      // {...appointment}
    /> 
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentItem}
        {/* due to the way the CSS is setup, need to add one extra appointment at end to view all */}
        <Appointment key="last" time="5pm" /> 
      </section>
    </main>
  );
}
