

const Notification = (props) => {

    const {notif}  = props
 
    const cssStyle ={
     color:'black',
     backgroundColor:'grey',
     border:'1px solid',
     padding:'5px',
     fontStyle:'italic'
    }  
   
   if(notif === '') return null  
   return (
         <div style={cssStyle}>a new anecdote  created </div>
    )
 }

 export default Notification;