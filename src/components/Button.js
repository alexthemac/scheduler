import React from "react";

import "components/Button.scss";

var classNames = require('classnames'); //require to use classNames as opposed to multiple different if statements

//Component for all the buttons
export default function Button(props) {
  
  //Append button--confirm or button--danger to className='button' if the props.confirm or props.danger are present (Changes style of button)
   let buttonClass = classNames( 'button', { 'button--confirm' : props.confirm, 'button--danger' : props.danger });

   return (
     <button
       className={buttonClass}
       onClick={props.onClick}
       disabled={props.disabled}
     >
       {props.children}
     </button>
   );
 }
 