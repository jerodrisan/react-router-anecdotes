//instalamos json server como dependencia de desarrollo : npm install json-server --save-dev
//añadimos en el package.json, scripts  : "server": "json-server -p3005 --watch db.json" 
import axios from "axios"
import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      anecdotes: [],
      current: 0
    }
  }

  //the lifecycle method componentDidMount,  is executed once right after the first time a component renders
  //Calling the method setState always triggers the rerender of the Class Component, i.e. calling the method render
  componentDidMount = () => {
    axios.get('http://localhost:3005/anecdotes').then(response => {
      this.setState({ anecdotes: response.data })
    })
  }

  handleClick = () => {
    const current = Math.floor(Math.random() *this.state.anecdotes.length)
    this.setState({ current: current})
  }


  render() {
    if (this.state.anecdotes.length === 0) {
      return <div>no anecdotes...</div>
    }

    return (
      <div>
        <h1>anecdote of the day</h1>
        <div>
          {this.state.anecdotes[this.state.current].content}
        </div>
        <button onClick ={this.handleClick}>next</button>
      </div>
    )
  }
}

export default App