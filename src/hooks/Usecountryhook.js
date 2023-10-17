import { useState, useEffect } from "react"

export const useCountry = (name) => {

    const [country, setCountry] = useState(null) 
    
    const url = "https://studies.cs.helsinki.fi/restcountries/api/name/"
    
    useEffect(() => { 
        (async () => {
        if(name!==''){
          const response = await fetch(`${url}/${name}`)
          const data  = await response.json()             
          const country = {...data, found:true}       
         //console.log(country)        
          setCountry(country)      
        }
      })()           
    },[name])  
    return country
  }

