import './EditTask.css'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';


const EditTask = () => {

	const [task, setTask] = useState('');
	const [category, setCategory] = useState('');
	const [taskStatus, setTaskStatus] = useState('');
	const [saveBtn, setSaveBtn] = useState('Update');
	const [deleteBtn, setDeleteBtn] = useState('Delete');
	const navigate = useNavigate();
	const {id} = useParams();
	const [errors, setErrors] = useState([]);

	const handleTask = (event) => {
        setTask(event.target.value);
    }

	const handleCategory = (event) => {
        setCategory(event.target.value);
    }

	const handleStatus = (event) => {
        setTaskStatus(event.target.value);
    }

	useEffect(() => {
		const fetchTask = async () => {
			const res = await axios.get(`http://127.0.0.1:8000/api/task/${id}`);
			if(res.data.status === 200)
			{
				setCategory(res.data.task.task_category);
				setTask(res.data.task.task_content);
				setTaskStatus(res.data.task.task_status);
			}
			else if(res.data.status === 404)
			{
				swal({
					title: "Warning!",
					text: res.data.message,
					icon: "warning",
					buttons: "OK"
				  });
				  navigate("/");
			}
		}
		fetchTask();
	},[]);

	const updateTask = async (event) => {
		document.getElementById('saveBtn').disabled = true;
		setSaveBtn('Updating ...');
		event.preventDefault();
		const res = await axios.put(`http://127.0.0.1:8000/api/update-task/${id}`,
		{
			task_content: task,
			task_status: taskStatus,
			task_category: category
		}
		);
		if(res.data.status === 200)
		{
			swal({
				title: "Success!",
				text: res.data.message,
				icon: "success",
				buttons: "OK"
			  });
			  navigate("/");
		}
		else
		{
			setErrors(res.data.validation_errors);
			document.getElementById('saveBtn').disabled = false;
			setSaveBtn('Update');
		}
	}

	const deleteTask = async (id) => {
		document.getElementById('deleteBtn').disabled = true;
		setDeleteBtn('Deleting ...');
		const res = await axios.delete(`http://127.0.0.1:8000/api/delete-task/${id}`);
		if(res.data.status === 200)
		{
			document.getElementById('deleteBtn').disabled = false;
			setDeleteBtn('Delete');
			// console.log(res.data.message);
			swal({
				title: "Deleted!",
				text: res.data.message,
				icon: "success",
				buttons: "OK"
			});
			navigate("/");
		}
		else if(res.data.status === 404)
		{
			swal({
				title: "Warning!",
				text: res.data.message,
				icon: "warning",
				buttons: "OK"
			  });
			  navigate("/");
		}
  	}

	return (
		<section className='edit-task'>
			<div className='container py-5'>
				<div className='row'>
					<div className='col-lg-12'>
						<div className='card'>
							<div className='card-header'>
								Edit Task
								<Link to="/" className="btn btn-primary btn-sm float-end" title='Back'>
									Back
								</Link>                
							</div>
							<div className='card-body'>
								<form onSubmit={updateTask}>
									<div className="mb-3">
										<label htmlFor="recipient-name" className="col-form-label">Category</label>
										<input name='task_category' onChange={handleCategory} value={category} type="text" className="form-control" id="recipient-name" />
										<span className="text-danger">{errors.task_category}</span>
									</div>
									<div className="mb-3">
										<label htmlFor="message-text" className="col-form-label">Task</label>
										<textarea name='task_content' onChange={handleTask} value={task} className="form-control" id="message-text"></textarea>
										<span className="text-danger">{errors.task_content}</span>
									</div>
									<div className='mb-3'>
										<label htmlFor="task-status" className="col-form-label">Status</label>
										<div class="form-check">
											<input class="form-check-input" onChange={handleStatus} checked={taskStatus == 'pending'} name='task_status' type="radio" value="pending" id="pending" />
											<label class="form-check-label" htmlFor="pending">
											pending
											</label>
										</div>
										<div class="form-check">
											<input class="form-check-input" onChange={handleStatus} checked={taskStatus == 'doing'} name='task_status' type="radio" value="doing" id="doing" />
											<label class="form-check-label" htmlFor="doing">
												doing
											</label>
										</div>
										<div class="form-check">
											<input class="form-check-input" onChange={handleStatus} checked={taskStatus == 'done'} name='task_status' type="radio" value="done" id="done" />
											<label class="form-check-label" htmlFor="done">
												done
											</label>
										</div>
									</div>
									<div className='mb-3'>
										<button type="submit" className="btn btn-primary btn-submit" id='saveBtn'>{saveBtn}</button>
										<button type='button' onClick={() => deleteTask(id) } className="btn btn-delete btn-danger ms-2" id='deleteBtn'>{deleteBtn}</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default EditTask