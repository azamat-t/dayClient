import React, { Component } from 'react'
import { Mutation } from "react-apollo"
import { UPDATE_TASK, GET_TASKS } from './graphql/task.query';

class UpdateTask extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: this.props.task.title,
      text: this.props.task.text,
      status: this.props.task.status,
      update: true
    }
    this.onChange = this.onChange.bind(this)
    this.onUpdateClick = this.onUpdateClick.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onUpdateClick() {
    this.setState(prevState => ({
      update: !prevState.update
    }))

  }
  render() {
    if (!this.state.update) {
      return (
        <button onClick={this.onUpdateClick}>Update</button>
      )
    } else {
      return (
        <Mutation
          mutation={UPDATE_TASK}
          update={(cache, { data: { updateTask } }) => {
            const { tasks } = cache.readQuery({ query: GET_TASKS });
            updateTask.date = Date(Date.now)
            cache.writeQuery({
              query: GET_TASKS,
              data: { tasks: tasks.slice(0, this.props.index).concat([updateTask]).concat(tasks.slice(this.props.index + 1)) },
            });
          }}>
          {(updateTask) => (
            <div>
              <form onSubmit={e => {
                e.preventDefault()
                updateTask({
                  variables: {
                    id: this.props.task._id,
                    task: {
                      title: this.state.title,
                      text: this.state.text,
                      status: this.state.status,
                      date: Date(Date.now())
                    }

                  }
                })
              }
              }>
                <input
                  placeholder="title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  type="text"
                />
                <input
                  placeholder="text"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  type="text"
                />
                <select name="status" value={this.state.status} onChange={this.onChange}>
                  <option value="Created">Created</option>
                  <option value="Done">Done</option>
                  <option value="Problem">Problem</option>
                </select>
                <input type="submit" value='Update Task' />
                {/* <button className='button' onClick={this.onUpdateClick}>Close</button> */}
              </form>

            </div>
          )}
        </Mutation>

      )
    }

  }
}

export default UpdateTask 