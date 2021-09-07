import {useState} from 'react';

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  //Create array to keep track of states. Allows us to go back to previous state
  const [history, setHistory] = useState([initial]);

  // console.log(history);

  //Moves mode forward (set default replace to false if no value)
  const transition = (newMode, replace = false) => {

    setMode(newMode);
    //replace determines whether we want to replace the last item in the history array with newMode, or just add newMode onto end of array.
    if(replace) {
      setHistory(prev => {
        //...creates new copy of the prev array with the last item in the array removed, then add the new mode onto end. Need to do copy as shouldn't modify direct
        return [...prev.slice(0, prev.length - 1), newMode]
      })
    } else {
      setHistory(prev => {
        //...creates new copy of the prev array, then add newMode on end of array. Need to do copy as shouldn't modify direct
        return [...prev, newMode]
      })
    }
  }

  //Moves mode backward
  const back = () => {
    if (history.length > 1) {

      setMode(history[history.length - 2]);

      setHistory(prev => {
        const returnArr = [...prev];
        returnArr.pop();
        return returnArr;
      })
    }
  }

  return { mode, transition, back }; 
}
