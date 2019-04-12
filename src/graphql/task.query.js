import gql from 'graphql-tag'

export const GET_TASKS = gql`
  query {
    tasks {
      _id
      title
      text
      status
      date
    }
  }
`

export const CREATE_TASK = gql`
  mutation createTask($task: CreateTaskInput!) {
    createTask(task: $task) {
      _id
      title
      text
      status
      date
    }
  }
`

export const UPDATE_TASK = gql`
  mutation updateTask($id: String!, $task: UpdateTaskInput!) {
    updateTask(_id: $id, task: $task) {
      _id
      title
      text
      status
      date
    }
  }
`

export const DELETE_TASK = gql`
  mutation deleteTask($id: String!) {
    deleteTask(_id: $id) {
      _id
      title
      text
      status
      date
    }
  }
`