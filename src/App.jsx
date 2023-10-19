import { useState } from 'react'
import { Navbar, Nav} from 'react-bootstrap'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate  
} from "react-router-dom"
import AnecdoteList from './components/Anecdote-List'
import Anecdote from './components/Anecdote'
import About from './components/About'
import Footer from './components/Footer'
import CreateNew from './components/Create'
import Notification from './components/Notificacion'


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
    },2500)
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
    <div className='container'>
      <h1> Software anecdotes</h1>
      <Router>
        <div>
          {/* <Link style={padding} to="/">anecdotes</Link>         
          <Link style={padding} to="/create">create</Link>
          <Link style={padding} to="/new">new</Link>
          <Link style={padding} to="/about">about</Link>
          <Notification notif = {notification} /> */}
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/">anecdotes</Link> 
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/create">create</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/new">new</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span">
                  <Link style={padding} to="/about">about</Link>
                </Nav.Link>                  
              </Nav>
            </Navbar.Collapse>
          </Navbar>
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
