//DEPRECATED, useReducer used now instead of useState
// import { useState, useEffect } from 'react';
import { useEffect, useReducer } from 'react';
import axios from "axios";


//Function (custom hook) that exports an array of states and functions required in Application.js (cleans up Application.js)
export default function useApplicationData () {

  //Define strings for reducer, not required but nice to have
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  //ALTERNATIVE TO USING SET STATE
  //Define the dispatch actions (inclduded helper functions in here)
  function reducer(state, action) {

    //Check for remaining spots for a day
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

    //Update the day with the correct number of spots
    const updateSpots = function (appointments) {

      //create new days array with updated spots
      let daysNew = state.days.map(day => { 
        return {...day, spots: remainingSpots(day, appointments)  }
      });
      
      // console.log("--------",daysNew);

      return daysNew;
    };

    //-----------DISPATCH ACTIONS------------------
    if(action.type === SET_DAY) {
      
      //Destructure
      const { day } = action.value

      return { 
        ...state, 
        day 
      };
    };

    if (action.type === SET_APPLICATION_DATA) {

      //Destructure
      const { days, appointments, interviewers } = action.value

      return {
        ...state, 
        days, 
        appointments, 
        interviewers
      };
    };

    if (action.type === SET_INTERVIEW) {

      // console.log("+++++++",action);

      //Destructure
      const {id, interview} = action.value

      //Create new appointment object from data in form (to be inserted)
      const appointment = {
        ...state.appointments[id],
        interview: interview ? { ...interview } : null
      };

      //Create new appointments object (to include newly created appointment from above)
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      //Create new days object
      const days = updateSpots(appointments) 
      
      return {
        ...state, 
        appointments, 
        days
      };
    };

    //Throw error if none of the actions exists
    throw new Error(
      `Tried to reduce with unsupported action type: ${action.type}`
    );   

  }; 

  //Define initialState
  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  };

  //ALTERNATIVE TO USING useState and setState
  const [state, dispatch] = useReducer(reducer, initialState);
 
  // const [state, setState] = useState({
  //   day: "",
  //   days: [],
  //   appointments: {
  //     // 1: {
  //     //   id: 1,
  //     //   time: "12pm",
  //     // },
  //     // 2: {
  //     //   id: 2,
  //     //   time: "1pm",
  //     //   interview: {
  //     //     student: "Lydia Miller-Jones",
  //     //     interviewer: {
  //     //       id: 1,
  //     //       name: "Sylvia Palmer",
  //     //       avatar: "https://i.imgur.com/LpaY82x.png",
  //     //     }
  //     //   }
  //     // },
  //     // 3: {
  //     //   id: 3,
  //     //   time: "2pm",
  //     // },
  //     // 4: {
  //     //   id: 4,
  //     //   time: "3pm",
  //     //   interview: {
  //     //     student: "Alex M",
  //     //     interviewer: {
  //     //       id: 5,
  //     //       name: "Sven Jones",
  //     //       avatar: "https://i.imgur.com/twYrpay.jpg",
  //     //     }
  //     //   }
  //     // },
  //     // 5: {
  //     //   id: 5,
  //     //   time: "4pm",
  //     //   interview: {
  //     //     student: "John Cena",
  //     //     interviewer: {
  //     //       id: 3,
  //     //       name: "Mildred Nazir",
  //     //       avatar: "https://i.imgur.com/T2WwVfS.png",
  //     //     }
  //     //   }
  //     // }
  //   },
  //   interviewers: {}
  // });

  //DEPRECTATED (use Reducer and dispatch now instead)
  // const setDay = day => setState({ ...state, day });

  const setDay = (day) => dispatch({ type: SET_DAY, value: {day} });

  //Pass to each appointment component (needs to be async funtion for query to work)
  function bookInterview(id, interview) {

    //MOVED TO REDUCERS ABOVE!!!!
    // //Create new appointment object from data in form (to be inserted)
    // const appointment = {
    //   ...state.appointments[id],
    //   interview: { ...interview }
    // };

    //MOVED TO REDUCERS ABOVE!!!!
    // //Create new appointments object (to include newly created appointment from above)
    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // };

    // const queryURL = `http://localhost:8001/api/appointments/${id}`;
    const queryURL = `${process.env.REACT_APP_API_BASE_URL}/api/appointments/${id}`;

    //Query server to add newly created interview object to appointments
    let bookReturn = axios.put(queryURL, {interview});

    
    //Set state to include new appointments and daysNew
    //DEPRECTATED (use Reducer and dispatch now instead)
    // bookReturn.then(() => { setState((prev) => ({...prev, appointments, days: updateSpots(appointments)})) });
    bookReturn.then(() => dispatch({type: SET_INTERVIEW, value: {id, interview}}));
    
    //return query promise to be used in other file
    return bookReturn;
  };

  function cancelInterview(id) {

    //MOVED TO REDUCERS ABOVE!!!!
    // //Create new appointment object with null interview data (to be inserted)
    // const appointment = {
    //   ...state.appointments[id],
    //   interview: null
    // };

    // //Create new appointments object (to include newly created appointment from above)
    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // };

    // const queryURL = `http://localhost:8001/api/appointments/${id}`;
    const queryURL = `${process.env.REACT_APP_API_BASE_URL}/api/appointments/${id}`;

    //Query server to add newly created interview object (with null interview spot) to appointments
    let cancelReturn = axios.delete(queryURL);

    //Set state to include new appointments and daysNew
    //DEPRECTATED (use Reducer and dispatch now instead)
    // cancelReturn.then(() => { setState((prev) => ({...prev, appointments, days: updateSpots(appointments)}))});

    //Must pass in inteview: null as SET_INTERVIEW action is expecting id and interview parameters
    cancelReturn.then(() => dispatch({type: SET_INTERVIEW, value: {id, interview: null}}));

    return cancelReturn;
  };

  //Perform 3 get requests at same time and wait for all to respond before setting state (data is dependant on each other)
  //Uses axios base url defined in .env.development or .env.test and appens /api/days etc to it for each request
  useEffect(()=> {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ]).then((all) => {

      // console.log("ALLLLL", all);
      // console.log("ALLLLL0data", all[0].data);
      // console.log("ALLLLL1data", all[1].data);
      // console.log("ALLLLL2data", all[2].data);

      //Take the responses and destructure them into array 
      const [daysRes, appointmentsRes, interviewersRes] = all
        
      //DEPRECTATED (use Reducer and dispatch now instead)
      // setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      //INCORRECT WAY TO USE dispatch, see next below for proper way (pass only type and and value)
      // dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }); 
      
      dispatch({ 
        type: SET_APPLICATION_DATA, 
        value: { 
          days: daysRes.data,
          appointments: appointmentsRes.data,
          interviewers: interviewersRes.data
        } 
      });

    })
  }, []);

  
  //STRETCH WORK WEB SOCKETS
  useEffect(() => {
    //Setup new websocket connection by creating webSocket object
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    //When new websocket connection opens, send "ping" to server
    webSocket.onopen = function (event) {
      webSocket.send("ping");
    };

    webSocket.onmessage = function (event) {

      //Convert returned string message to object via JSON.parse
      const msg = JSON.parse(event.data);
      //Console log the message
      // console.log("Message Recieved: ", msg);

      // console.log("msg.id", msg.id);

      // console.log("msg.interview", msg.interview);

      //Desructure message
      const { id, interview } = msg

      //Pass to set interview   
      dispatch({type: SET_INTERVIEW, value: {id, interview}});
    };
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