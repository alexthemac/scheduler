import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment/index";
import axios from "axios";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

// //No longer needed as grabbing data from scheduler-api server
// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

// //No longer needed as grabbing data from scheduler-api server
// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Alex M",
//       interviewer: {
//         id: 5,
//         name: "Sven Jones",
//         avatar: "https://i.imgur.com/twYrpay.jpg",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//     interview: {
//       student: "John Cena",
//       interviewer: {
//         id: 3,
//         name: "Mildred Nazir",
//         avatar: "https://i.imgur.com/T2WwVfS.png",
//       }
//     }
//   }
// ];

export default function Application(props) {
  
  //REPLACED BY SINGLE STATE OBJECT BELOW
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);
  // const [appointment, setAppointments] = useState({});


  //NEW SINGLE STATE OBJECT REPLACES ABOVE
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {
      1: {
        id: 1,
        time: "12pm",
      },
      2: {
        id: 2,
        time: "1pm",
        interview: {
          student: "Lydia Miller-Jones",
          interviewer: {
            id: 1,
            name: "Sylvia Palmer",
            avatar: "https://i.imgur.com/LpaY82x.png",
          }
        }
      },
      3: {
        id: 3,
        time: "2pm",
      },
      4: {
        id: 4,
        time: "3pm",
        interview: {
          student: "Alex M",
          interviewer: {
            id: 5,
            name: "Sven Jones",
            avatar: "https://i.imgur.com/twYrpay.jpg",
          }
        }
      },
      5: {
        id: 5,
        time: "4pm",
        interview: {
          student: "John Cena",
          interviewer: {
            id: 3,
            name: "Mildred Nazir",
            avatar: "https://i.imgur.com/T2WwVfS.png",
          }
        }
      }
    },
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  // const setDays = days => setState(prev => ({ ...prev, days }));
  
  //Create an array of appointments for the selected day 
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  //Create an array of interviewers for the selected day array
  const dailyInterviewers = getInterviewersForDay(state, state.day);


  //Pass to each appointment component (needs to be async funtion for query to work)
  function bookInterview(id, interview) {

    //Create new appointment object
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    //Create new appointments object
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const queryURL = `http://localhost:8001/api/appointments/${id}`;
    let bookReturn = axios.put(queryURL, {interview})

    //Set state to include new appointments
    bookReturn.then(() => { setState({...state, appointments} )})
    
    //return promise to be used in other file
    return bookReturn;
  
    
    ///ALTERNATIVE WAY TO PROMISE FOR bookReturn ADD async in front of function bookInterview. (also in front of function save)
    // const queryURL = `http://localhost:8001/api/appointments/${id}`;
    // let response = await axios.put(queryURL, {interview})
    //   .then(() => { setState({...state, appointments} ); return true; })
    // if (response) {
    //   return true
    // }
  }

  function cancelInterview(id) {

    const interview = null;



    console.log("cancelInterviewInApp", interview);
    
    // const queryURL = `http://localhost:8001/api/appointments/${id}`;

    

  }

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

  // // //Use axios to query the scheduler-api server running on port 8001
  // // ONLY FOR A SINGLE QUERY (DAYS). REPLACED BY USEEFFECT BELOW WITH PROMISE.ALL FOR 3 queries
  // useEffect(() => {
  //   const queryURL = 'http://localhost:8001/api/days';
  //     axios.get(queryURL)
  //       .then((response) => {setDays(response.data);})
  //     }, []);

  //Perform 3 get requests at same time and wait for all to respond before setting state (data is dependant on each other)
  useEffect(()=> {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
  
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
   
    });
  }, [])

 
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
