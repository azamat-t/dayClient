import React, { Component } from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from "react-apollo"
import './App.css'
import Tasks from './Tasks'
import CreateTask from './CreateTask'
import MdAdd from 'react-ionicons/lib/MdAdd'
import MdArrowBack from 'react-ionicons/lib/MdArrowBack'

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
})

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      addButton: false
    }
    this.onAddClick = this.onAddClick.bind(this)
  }

  onAddClick(e) {
    e.preventDefault()
    this.setState(prevState => ({
      addButton: !prevState.addButton
    }));
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="container">
          <h1>Plan your Time</h1>
          <button className='button' onClick={
            this.onAddClick}>{this.state.addButton ?
              <MdArrowBack color="#ffffff" /> :
              <MdAdd color="#ffffff" />}
          </button>
          {this.state.addButton && <CreateTask />}
          <Tasks />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
