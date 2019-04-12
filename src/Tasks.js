import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { GET_TASKS } from './graphql/task.query'
import DeleteTask from './DeleteTask'
import UpdateTask from './UpdateTask'
import classnames from 'classnames'
import Moment from 'react-moment'
import MdCreate from 'react-ionicons/lib/MdCreate'

class Tasks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      updateId: ''
    }
    // this.onUpdate = this.onUpdate.bind(this)
  }

  // onUpdate(e, id) {

  //   e.preventDefault()
  //   this.setState({
  //     updateId: id
  //   })
  // }
  render() {
    return (
      <Query query={GET_TASKS}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading ...</p>
          if (error) return <p>Error Loading...</p>

          return (
            <div>
              {data.tasks.map((task, index) => (
                <div className='box' key={task._id}>
                  {this.state.updateId !== task._id ? (
                    <div>
                      <div className={classnames('nav', {
                        'info': task.status === 'Created',//'Doing'
                        'success': task.status === 'Done',//'Done'
                        'danger': task.status === 'Problem',
                        '': task.status === 'Created'
                      })}>
                        <div>
                          {index + 1}. {task.title}
                        </div>
                        <div>
                          <button onClick={() => this.setState({ updateId: task._id })} className='actions'><MdCreate color="#ffffff" /></button>
                          <DeleteTask id={task._id} index={index} />
                        </div>
                      </div>
                      <div className='text'>
                        <p>{task.text}</p>

                      </div>
                      <hr />
                      <div className='bottom'>
                        {task.status}
                        <Moment format="HH:mm DD/MM/YYYY">{task.date}</Moment>
                      </div>
                    </div>
                  ) : (
                      <UpdateTask task={task} index={index} />
                    )}


                </div>
              ))}
            </div>
          )
        }}
      </Query>
    )

  }
}

export default Tasks