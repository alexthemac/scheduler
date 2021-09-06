import React from "react";

import "components/Button.scss";

var classNames = require('classnames'); //require to use classNames as opposed to multiple different if statemetns

export default function Button(props) {

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
 