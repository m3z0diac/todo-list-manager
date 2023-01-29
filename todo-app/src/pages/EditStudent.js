import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import swal from "sweetalert"
import { useNavigate } from 'react-router-dom';

const EditStudent = () => {

    const {id} = useParams();
    const [name, setName] = useState('');
    const [course, setCourse] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState([]);
    const [btnMsg, setBtnMsg] = useState('Update');
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

    useEffect(() => {
        const fetchItem = async () => {
            const res = await axios.get(`http://127.0.0.1:8000/api/edit-student/${id}`);
            if(res.data.status === 200)
            {
                console.log(res.data.message);
                setName(res.data.student.name);
                setCourse(res.data.student.course);
                setEmail(res.data.student.email);
                setPhone(res.data.student.phone);
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
        fetchItem();
    }, []);

    const updateStudent = async (event) => {
        // document.getElementById('updateBtn').disabled = true;
        setBtnMsg('Updating ...');
        event.preventDefault();
        const res = await axios.put(`http://127.0.0.1:8000/api/update-student/${id}`,
            {
                name: name,
                course: course,
                email: email,
                phone: phone
            }
        );
        if(res.data.status === 200)
        {
            console.log(res.data.message);
            swal({
                title: "Updated!",
                text: res.data.message,
                icon: "success",
                buttons: "OK"
              });
            setBtnMsg('Update');
            document.getElementById('updateBtn').disabled = false;
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
                            Edit Students
                            <Link to={'/'} className="btn btn-primary btn-sm float-end">Back</Link>
                        </h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={updateStudent}>
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
                                <button type="submit" id="updateBtn" className="btn btn-primary">{btnMsg}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditStudent