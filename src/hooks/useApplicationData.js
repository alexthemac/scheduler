import { useState, useEffect } from 'react';
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";


//Function (custom hook) that exports an array of states and functions required in Application.js (cleans up Application.js)
export default function useApplicationData () {

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


  console.log("DAYYSSSSSS", state.days);

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
    }

    //create new days array with updated spots
    let daysNew = state.days.map(day => { 
      return {...day, spots: remainingSpots(day, appointments)  }
    });

    //Query server to add newly created interview object to appointments
    const queryURL = `http://localhost:8001/api/appointments/${id}`;
    let bookReturn = axios.put(queryURL, {interview})

    //Set state to include new appointments and daysNew
    bookReturn.then(() => { setState((prev) => ({...prev, appointments, days: daysNew})) })
    // bookReturn.then(() => { setState({...state, appointments} )})
    // cancelReturn.then(() => { setState((prev) => ({...prev, appointments, days: daysNew}))})

    
    //return query promise to be used in other file
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

    //FOLLOWING DID NOT WORK FOR CREATIG NEW ARRAY-----------------------
    // let daysNew = Array.from([...state.days]);
    
    // let daysNew = state.days.slice();

    //create new days array
    // let daysNew = [
    //   ...state.days
    // ];

    //THIS ALWAYS MODIFIES state.days for some reason
    // daysNew[dayIndex].spots = 100;


    // days[0].spots = 100;


    // //Find index of day where appointment is deleted
    // const dayIndex = daysNew.findIndex((day) => state.day === day.name )

    //-------------------------------------


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
    }

    //create new days array with updated spots
    let daysNew = state.days.map(day => { 
      return {...day, spots: remainingSpots(day, appointments)  }
    });


    const queryURL = `http://localhost:8001/api/appointments/${id}`;
    let cancelReturn = axios.delete(queryURL)

    cancelReturn.then(() => { setState((prev) => ({...prev, appointments, days: daysNew}))})
    // cancelReturn.then(() => { setState({...state, appointments})})


    // .then(() => { setState({...state, days})})
  
    return cancelReturn;
  }

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

  // useEffect(() => console.log (`${JSON.stringify(state.days.spots)} spot has changed!`), [state.appointments])

  const returnObj = {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

  return returnObj;
}