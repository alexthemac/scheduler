//Returns an array (new array, not affecting original state) of appointments for a specific day
export function getAppointmentsForDay(state, day) {
    
    const returnArray = [];

    //Create array containing single object that matches desired day
    const filteredDays = state.days.filter(desiredDay => desiredDay.name === day)
    
    //Verify that there is a day inside of the filteredDays array 
    if (filteredDays.length > 0) {

      //Check for appointments in state.appointments that match the appointments associated with the filteredDays array
      for (const appointment of filteredDays[0].appointments) {
        for (const key in state.appointments){
    
          if (appointment == key) {
            returnArray.push(state.appointments[key])
          };
        };
      };
    };
  return returnArray;
};

//Return new object (new object, not affecting original state) with interviewers information (avatar and name) attached to an interview object as opposed to just a number
export function getInterview(state, interview) {

  //Object of interviewers ex --> {1: { id: 1, avatar: ....., name: ....}, 2: { id: 2, avatar:...., name:.....}.etc...}
  const interviewers = state.interviewers;

  //interview is an object ex --> {student: "Liam Martinez", interviewer: 4,  }
  
  //If interview is not NULL
  if (interview) {
    //Create new obj from original interview obj via spread operator
    const newInterviewObj = {...interview};

    //Update interviewer key value (current just an integer representing an id) to pull details from interviewers object
    newInterviewObj.interviewer = interviewers[newInterviewObj.interviewer];

    return newInterviewObj;
  }
  //If interview is NULL
  return null;
};

//Returns an array (new array, not affecting original state) of interviewers for a specific day
export function getInterviewersForDay(state, day) {
  
  const returnArray = [];

  //Create array containing single object that matches desired day
  const filteredDays = state.days.filter(desiredDay => desiredDay.name === day)
  
  //Verify that there is a day inside of the filteredDays array 
  if (filteredDays.length > 0) {

    //Check for interviewers in state.interviewers that match the interviewer associated with the filteredDays array
    for (const interviewer of filteredDays[0].interviewers) {
      for (const key in state.interviewers){

        if (interviewer == key) {
          returnArray.push(state.interviewers[key])
        };
      };
    };
  };

  return returnArray;
};