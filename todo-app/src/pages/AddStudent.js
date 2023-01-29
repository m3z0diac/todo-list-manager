import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert"

const AddStudent = (props) => {

    const [name, setName] = useState('');
    const [course, setCourse] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleName = (event) => {
        setName(event.target.value);
    }
    const handleCourse = (event) => {
        setCourse(event.target.value);
    }
    const handleEmail = (event) => {
        setEmail(event.target.value);
    }
    const handlePhone = (event) => {
        setPhone(event.target.value);
    }

    const saveStudent = async (event) => {
        event.preventDefault();
        const res = await axios.post('http://127.0.0.1:8000/api/add-student',
            {
                name: name,
                course: course,
                email: email,
                phone: phone
            }
        );
        if(res.data.status === 200)
        {
            // console.log(res.data.message);
            swal({
                title: "Added!",
                text: res.data.message,
                icon: "success",
                buttons: "OK"
              });
            setName('');
            setCourse('');
            setEmail('');
            setPhone('');
            setErrors([]);
            navigate("/");
        }
        else
        {
            setErrors(res.data.validation_errors);
        }
    }

  return (
    <div className="container">
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header">
                        <h4>
                            Add Students
                            <Link to={'/'} className="btn btn-primary btn-sm float-end">Back</Link>
                        </h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={saveStudent}>
                            <div className="form-group mb-3">
                                <label>Student Name</label>
                                <input type="text" name="name" onChange={handleName} value={name} className="form-control" />
                                <span className="text-danger">{errors.name}</span>
                            </div>
                            <div className="form-group mb-3">
                                <label>Student Course</label>
                                <input type="text" name="course" onChange={handleCourse} value={course} className="form-control" />
                                <span className="text-danger">{errors.course}</span>
                            </div>
                            <div className="form-group mb-3">
                                <label>Student Email</label>
                                <input type="text" name="email" onChange={handleEmail} value={email} className="form-control" />
                                <span className="text-danger">{errors.email}</span>
                            </div>
                            <div className="form-group mb-3">
                                <label>Student Phone</label>
                                <input type="text" name="phone" onChange={handlePhone} value={phone} className="form-control" />
                                <span className="text-danger">{errors.phone}</span>
                            </div>
                            <div className="form-group mb-3">
                                <button type="submit" className="btn btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddStudent