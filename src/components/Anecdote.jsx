import {useParams} from 'react-router-dom'


const Anecdote = ({anecdoteById}) => { // pasamos la funcion anecdoteById la cual lleva por parametro la id y devuelve la anecdota  
    const id = useParams().id   
    const anecdota = anecdoteById(id) 
    return(
        <div>
            <h2>{anecdota.content} by {anecdota.author}</h2>
            <p>has {anecdota.votes} votes</p>
            <p>for more info see  {anecdota.info} votes</p>
  
        </div>
      )
}

export default Anecdote

