const state = {
  day: "Monday",
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers: [1, 2],
      spots: 2
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: [1, 2],
      spots: 3
    },
  ],

  appointments: {
    1: { id: 1, time: "12pm", interview: null },
    2: { id: 2, time: "1pm", interview: null },
    3: {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 },
    },
    4: { id: 4, time: "3pm", interview: null },
    5: {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 },
    },
  },
};

const showAllSpots = function (days) {
  for (const day of days) {
    console.log(day.name, "Spots = ", day.spots);
  }
};


const updateSpots = function (state, appointments) {

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



  // ** your code goes here  
  return [];
};


// Simulated bookInterview. No axios.put of course
const bookInterview = function (id, interview) {
  const appointment = { ...state.appointments[id], interview: { ...interview } };
  const appointments = { ...state.appointments, [id]: appointment };

  // use our new appointments to calculate the new spots for the current day
  // This is the days array we will save back into state
  const days = updateSpots(state, appointments);

  // axios.put().then() {
  // setState({...state, appointments, days})
  // }

  // Show our updated days array
  console.log("\n*** Updated Days Array");
  showAllSpots(days);

  // New Spots for Monday should be 1
  const pass = days.length == 2 && days[0].spots === 1;
  console.log('\n', pass ? "**PASS: Spots Updated correctly" : " FAIL: Spots Update failed");
};

// ******** START OF TEST CODE *********

// This is the initial state
console.log("\n*** Initial State Days Array");
showAllSpots(state.days);

// Simulate bookInterview
bookInterview(1, { student: "Test Student", interviewer: 99 });

// Hopefully this is unchanged
console.log("\n*** Final State Days Array");
showAllSpots(state.days);

const passText = 'Original State unchanged';
const failText = 'Original State has been changed!!!';

let pass = state.days[0].spots === 2 && state.days[1].spots === 3;
console.log('\n', pass ? passText : failText);
