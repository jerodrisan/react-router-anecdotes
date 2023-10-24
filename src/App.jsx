import { useState } from 'react'
import About from './components/About'
import {Footer}  from './components/Footer'
import CreateNew from './components/Create-New'
import Notification from './components/Notification'
import AnecdoteList  from './components/Anecdote-List'
import Anecdote from './components/Anecdote'

import { BrowserRouter as Router,  Routes,  Route,   Link,  Navigate  } from "react-router-dom"


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
