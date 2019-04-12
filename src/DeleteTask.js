import React, { Component } from 'react'
import MdTrash from 'react-ionicons/lib/MdTrash'
import { Mutation } from "react-apollo"
import { DELETE_TASK, GET_TASKS } from './graphql/task.query';

class DeleteTask extends Component {
  render() {
    return (
      <Mutation
        mutation={DELETE_TASK}
        update={(cache, { data: { deleteTask } }) => {
          const { tasks } = cache.readQuery({ query: GET_TASKS })
          cache.writeQuery({
            query: GET_TASKS,
            data: { tasks: tasks.slice(0, this.props.index).concat(tasks.slice(this.props.index + 1)) }
          });
        }}
      >
        {(deleteTask) => (
          <button
            className='actions' onClick={e => {
              e.preventDefault()

              deleteTask({
                variables: {
                  id: this.props.id
                }
              })
            }
            }><MdTrash color="#ffffff" />
          </button>
        )}
      </Mutation>

    )
  }
}

export default DeleteTask
