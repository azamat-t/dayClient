import React, { Component } from 'react'
import { Mutation } from "react-apollo"
import { CREATE_TASK, GET_TASKS } from './graphql/task.query';

class CreateTask extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      text: '',
      status: 'Created',
      date: ''
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <Mutation
        mutation={CREATE_TASK}
        update={(cache, { data: { createTask } }) => {
          const { tasks } = cache.readQuery({ query: GET_TASKS })
          createTask.date = Date(Date.now)
          cache.writeQuery({
            query: GET_TASKS,
            data: { tasks: tasks.concat([createTask]) },
          });
        }}>
        {(createTask) => (
          <div>
            <form onSubmit={e => {
              e.preventDefault()
              createTask({
                variables: {
                  task: {
                    title: this.state.title,
                    text: this.state.text,
                    status: this.state.status,
                    date: Date(Date.now())
                  }
                }
              })
              this.setState({ title: "", text: "", status: "", date: "" })
            }
            }>
              <input
                placeholder="title"
                name="title"
                value={this.state.title}
                onChange={this.onChange}
                type="text"
                required
              />
              <input
                placeholder="text"
                name="text"
                value={this.state.text}
                onChange={this.onChange}
                type="text"
                required
              />
              <input type="submit" value='Add Task' />
            </form>
          </div>
        )}
      </Mutation>

    )
  }
}

export default CreateTask 