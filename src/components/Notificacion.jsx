import {Alert} from 'react-bootstrap'

const Notification = (props) => {

    const {notif}  = props 
    //const cssStyle ={ color:'black', backgroundColor:'grey', border:'1px solid', padding:'5px',fontStyle:'italic' }        
   return ( notif && <Alert >a new anecdote created:  {notif}</Alert>)
 }

 export default Notification