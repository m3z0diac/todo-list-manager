import axios from 'axios'
import { useEffect, useState } from 'react'
import TaskCard from '../../components/TaskCard/TaskCard'
import './TaskList.css'
import swal from 'sweetalert'

const TaskList = () => {

    const [tasks, setTasks] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/tasks');
                if(res.data.status === 200)
                {
                    setLoading(false);
                    setTasks(res.data.tasks);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    let tasksData = ""
    if(loading)
    {
        tasksData = <TaskCard task_category   = 'Loading ...' task_content    = 'Loading ...' task_status     = 'Loading ...' />
    }
    else {
        tasksData = tasks.map( (task) => {
            return (
                <div className='col-lg-4 mt-2'>
                    <TaskCard
                        key             = {task.id}
                        id              = {task.id}
                        task_category   = {task.task_category}
                        task_content    = {task.task_content}
                        task_status     = {task.task_status}
                    />   
                </div>
            )
        })
    }

    return (
        <section className='tasklist'>
            <div className='container py-5'>
                <div className='row'>
                    {tasksData}
                </div>
            </div>
        </section>
    )
}

export default TaskList