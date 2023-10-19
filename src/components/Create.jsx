
import {useField} from '../hooks/index' //Importamos el custom hook para usarlo en el formulario
import {Form, Button} from 'react-bootstrap'
//import { useNavigate } from 'react-router-dom'

const CreateNew = (props) => {   
  
  const content = useField ({type:'text',name:'content'})
  const author = useField ({type:'text',name:'author'})
  const info = useField ({type:'text',name:'info'})  
  //const navigate = useNavigate() //creamos la anecdota y nos redirije directamente al link de anecdotes para verla recien creada

  const handleSubmit = (e) => {   
    e.preventDefault()    
    console.log('valor boton ', e.target.name)
    props.addNew({content: content.value, author:author.value, info: info.value, votes: 0 })
    //navigate('/')
  }

  const handleReset = (ev) =>{
    ev.preventDefault()
    content.reset()
    author.reset()
    info.reset()    
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
            <div>
                <Form.Label>content:</Form.Label>
                <Form.Control type={content.type} name={content.name} value={content.value} onChange={content.onChange} />   
             </div>
             <div>    
            {/* author <input {...author} />  si ponemos el spread , entonces se añadiria el campo reset al input lo cual es erroneo*/}
                <Form.Label>author:</Form.Label>
                <Form.Control type={author.type} name={author.name} value={author.value} onChange={author.onChange} />
           </div>
            <div>        
            {/* url for more info <input {...info} /> No usaremos el spread operador*/}
                <Form.Label>url for more info:</Form.Label>
                <Form.Control type={info.type} name={info.name} value={info.value} onChange={info.onChange} />
            </div>
            <Button type="submit" variant='primary'>create</Button>
            <Button type= "button" variant="primary" onClick={handleReset}>reset</Button>

        </Form.Group>
       
      </Form>
    </div>
  )
}

export default CreateNew