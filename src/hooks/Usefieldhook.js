// Archivo de custon hooks

import { useState } from "react";

export const useField = ({type,name}) =>{
  
    const [value, setValue] = useState('');    
    const onChange  = (ev) =>{
        setValue(ev.target.value);
    }
   
    return ({ type,name, value, onChange})   
}

