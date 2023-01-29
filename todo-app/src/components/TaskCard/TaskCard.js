import axios from 'axios'
import { useState } from 'react'
import './TaskCard.css'
import { FaEdit } from "react-icons/fa"
import { Link } from 'react-router-dom'


const TaskCard = (props) => {

  	return (
		<div className='card shadow-lg'>
			<div className='card-header'>
				<span className='task-status'>
					<span className="btn btn-primary btn-sm me-1" title='status'>{props.task_status}</span>
				</span>
				<div className='task-info float-end'>
					<Link to={`/edit-task/${props.id}`} id='deleteBtn' className="btn btn-success btn-sm me-1" title='edit'>
						<FaEdit/>
					</Link>                                
				</div>
			</div>
			<div className='card-body'>
				<span class="text-muted">{props.task_category}</span>
				<h5 className='task-text'>{props.task_content}</h5>
			</div>
		</div>
	)
}

export default TaskCard