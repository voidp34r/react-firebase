import React, { PropTypes } from 'react'
import { map } from 'lodash'
import { connect } from '../../src'

import TaskSummary from './TaskSummary'

const TaskListItem = ({ taskId }) => (
  <li><TaskSummary taskId={taskId} /></li>
)

TaskListItem.propTypes = {
  taskId: PropTypes.string.isRequired,
}

const TaskList = ({ tasks }) => (
  <div>
    <ul>
      {map(tasks, (task, key) => <TaskListItem key={key} taskId={key} />)}
    </ul>
  </div>
)

TaskList.propTypes = {
  tasks: PropTypes.object,
}

const mapPropsToSubscriptions = ({ outside }) => {
  if (outside) {
    return {
      tasks: database => database.ref('tasks').orderByChild('outside').equalTo(true),
    }
  }

  return {
    tasks: 'tasks',
  }
}

export default connect(mapPropsToSubscriptions)(TaskList)
