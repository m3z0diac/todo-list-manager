import { useState } from 'react'
import axios from 'axios';
import './Header.css'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { FormModal } from '../../components/index'

const Header = () => {

	const [task, setTask] = useState('');
	const [category, setCategory] = useState('');
	const [saveBtn, setSaveBtn] = useState('Save');
	const navigate = useNavigate();
	const [errors, setErrors] = useState([]);

	const handleTask = (event) => {
        setTask(event.target.value);
    }

	const handleCategory = (event) => {
        setCategory(event.target.value);
    }

	const saveTask = async (event) => {
		document.getElementById('saveBtn').disabled = true;
		setSaveBtn('Saving ...');
		event.preventDefault();
		const res = await axios.post('http://127.0.0.1:8000/api/add-task',
				{
					task_content: task,
					task_status: 'pending',
					task_category: category
				}
		);
		if(res.data.status === 200)
		{
			document.getElementById('saveBtn').disabled = false;
			setSaveBtn('Save');
			console.log(res.data);
			swal({
				title: "Success",
				text: res.data.message,
				icon: "success",
				button: "ok",
			  });
			document.getElementById('closeBtn').click();
			navigate("/tasks");
		}
		else
		{
			setErrors(res.data.validation_errors);
			document.getElementById('saveBtn').disabled = false;
			setSaveBtn('Save');
		}
	}

  return (
    <header className='py-5'>
        <div className='container text-center'>
            <h1>Welcome To Tasks Manager App</h1>
            <div className='mt-3'>
                <button type="button" className="btn btn-primary main-btn btn-lg" data-bs-toggle="modal" data-bs-target="#addTaskModal" data-bs-whatever="@mdo">
					Add Task
				</button>
				<FormModal
					formFunc={saveTask}
					title="New Task"
					inputOne={category}
					handleInputOne={handleCategory}
					inputTwo={task}
					handleInputTwo={handleTask}
					errOne={errors.task_category}
					errTwo={errors.task_content}
					btn={saveBtn}
				/>
            </div>
        </div>
    </header>
  )
}

export default Header