import './Tasks.css'
import { Header, TaskList } from '../../sections/index'

const Tasks = () => {
  return (
    <>
        <div className='tasks'>
            <Header/>
            <TaskList/>
        </div>
    </>
  )
}

export default Tasks