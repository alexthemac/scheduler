import { useState, useEffect } from 'react';
import axios from "axios";


//Function (custom hook) that exports an array of states and functions required in Application.js (cleans up Application.js)
export default function useApplicationData () {

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

  //Pass to each appointment component (needs to be async funtion for query to work)
  function bookInterview(id, interview) {

    //Create new appointment object from data in form (to be inserted)
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    //Create new appointments object (to include newly created appointment from above)
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //Check for remaining spots
    const remainingSpots = function (day, appointments) {

      let spots = 0;

      //Check inside each appointment (using app, appointment id) to see if the interview is null or not
      for (const app of day.appointments) {
        //If current interview is null, increment the spots
        if (appointments[app].interview === null) {
          spots++;
        }
      }
      return spots;
    };

    //create new days array with updated spots
    let daysNew = state.days.map(day => { 
      return {...day, spots: remainingSpots(day, appointments)  }
    });

    const queryURL = `http://localhost:8001/api/appointments/${id}`;
    //Query server to add newly created interview object to appointments
    let bookReturn = axios.put(queryURL, {interview});

    //Set state to include new appointments and daysNew
    bookReturn.then(() => { setState((prev) => ({...prev, appointments, days: daysNew})) });
    
    //return query promise to be used in other file
    return bookReturn;
  };

  function cancelInterview(id) {

    //Create new appointment object with null interview data (to be inserted)
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    //Create new appointments object (to include newly created appointment from above)
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    //Check for remaining spots
    const remainingSpots = function (day, appointments) {

      let spots = 0;

      //Check inside each appointment (using app, appointment id) to see if the interview is null oro not
      for (const app of day.appointments) {
        //If current interview is null, increment the spots
        if (appointments[app].interview === null) {
          spots++;
        }
      }
      return spots;
    };

    //create new days array with updated spots
    let daysNew = state.days.map(day => { 
      return {...day, spots: remainingSpots(day, appointments)  }
    });

    const queryURL = `http://localhost:8001/api/appointments/${id}`;
    //Query server to add newly created interview object (with null interview spot) to appointments
    let cancelReturn = axios.delete(queryURL);

    //Set state to include new appointments and daysNew
    cancelReturn.then(() => { setState((prev) => ({...prev, appointments, days: daysNew}))});

    return cancelReturn;
  };

  //Perform 3 get requests at same time and wait for all to respond before setting state (data is dependant on each other)
  useEffect(()=> {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers')
    ]).then((all) => {
  
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
   
    });
  }, []);

  // //Stretch work webs socket

  useEffect(() => {
    //Setup new websocket connection by creating webSocket object
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    //When new websocket connection opens, send "ping" to server
    webSocket.onopen = function (event) {
      webSocket.send("ping");
    };

    //When message recived from server
    webSocket.onmessage = function (event) {

      //Convert returned string message to object via JSON.parse
      const msg = JSON.parse(event.data);
      //Console log the message
      console.log("Message Recieved: ", msg);

      // setState((prev) => {...prev, } )

    }
  }, []);

 
  
  
  //Object to be used in Application.js
  const returnObj = {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };

  return returnObj;

};