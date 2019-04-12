import React from 'react'
import { Table } from 'semantic-ui-react'
import DeleteTask from './DeleteTask'
import UpdateTask from './UpdateTask'
import Moment from 'react-moment'

const Task = (props) => (
  <Table.Row>
    <Table.Cell>{props.index + 1}</Table.Cell>
    <Table.Cell>
      {props.task.title}
    </Table.Cell>
    <Table.Cell>{props.task.text}</Table.Cell>
    <Table.Cell>{props.task.status}</Table.Cell>
    <Table.Cell><Moment format="HH:mm DD/MM/YYYY">{props.task.date}</Moment></Table.Cell>
    <Table.Cell><UpdateTask task={props.task} index={props.index} /></Table.Cell>
    <Table.Cell><DeleteTask id={props.task._id} index={props.index} /></Table.Cell>
  </Table.Row>
)

export default Task