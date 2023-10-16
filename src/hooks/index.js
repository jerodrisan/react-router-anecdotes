// Archivo de custon hooks

import { useState } from "react";

const useField = (name) =>{

    const [value, setValue] = useState('');
    const onChange  = (ev) =>{
        setValue(ev.target.value);
    }
    return ({name, value, onChange}) 
}

export default useField