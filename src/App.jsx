import { useState } from 'react'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom"

import {useField} from './hooks/index' //Importamos el custom hook para usarlo en el formulario
//import {useClear} from './hooks/index'



const Anecdote = ({anecdoteById}) => { // pasamos la funcion anecdoteById la cual lleva por parametro la id y devuelve la anecdota  
  const id = useParams().id   
  const anecdota = anecdoteById(id) 
  return(
      <div>
          <h2>{anecdota.content} by {anecdota.author}</h2>
          <p>has {anecdota.votes} votes</p>
          <p>for more info see  {anecdota.info} </p>

      </div>
    )
  }

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id} > <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link></li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => {
  const sourceCode = "https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js/"
  const courseUrl = "https://fullstackopen.com/"
  return(
    <div>
      Anecdote app for <a href={courseUrl}>Full Stack Open</a>.<br />
      See <a href={sourceCode}>{sourceCode}</a> for the source code.
    </div>
  )
}

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
      <form onSubmit={handleSubmit}>
        <div>        
          content <input type={content.type} name={content.name} value={content.value} onChange={content.onChange} />
        </div>
        <div>         
          {/* author <input {...author} />  si ponemos el spread , entonces se añadiria el campo reset al input lo cual es erroneo*/}
          author <input type={author.type} name={author.name} value={author.value} onChange={author.onChange} />
        </div>
        <div>        
          {/* url for more info <input {...info} /> No usaremos el spread operador*/}
          url for more info <input type={info.type} name={info.name} value={info.value} onChange={info.onChange} />
        </div>
        <button >create</button>
        <button type= "button" onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

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


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  const [notification, setNotification] = useState('')

  const padding = {
    paddingRight:20
  }

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(anecdote.content)
    setTimeout(() => {
      setNotification('')
    },5000)
  }  


  const anecdoteById = (id) => 
    anecdotes.find(a => a.id === Number(id))   

  

  const vote = (id) => {
    const anecdote = anecdoteById(id)
    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div>
      <h1> Software anecdotes</h1>
      <Router>
        <div>
          <Link style={padding} to="/">anecdotes</Link>         
          <Link style={padding} to="/create">create</Link>
          <Link style={padding} to="/new">new</Link>
          <Link style={padding} to="/about">about</Link>
          <Notification notif = {notification} />

          <Routes>
            <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />}/>
            <Route path="/anecdotes" element={<AnecdoteList anecdotes={anecdotes} />}/>
            <Route path="/anecdotes/:id" element={<Anecdote anecdoteById={anecdoteById}/>}/>
            <Route path="/create" element={<CreateNew addNew={addNew}/>}/>
            <Route path="/new" element ={<Navigate replace to="/create" />} />
            <Route path="/about" element={<About />}/>
          </Routes>
        </div>
      </Router>
      <Footer />

    </div>
  )
}

export default App
