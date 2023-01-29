import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import swal from "sweetalert"

const Student = () => {

    const [students, setStudents] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/students');
                setStudents(res.data.students);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const deleteStudent = async (e, id) => {
        const clickedBtn = e.currentTarget;
        clickedBtn.innerText = "Deleting ..."
        const res = await axios.delete(`http://127.0.0.1:8000/api/delete-student/${id}`);
        if(res.data.status === 200)
        {
            clickedBtn.closest("tr").remove();
            // console.log(res.data.message);
            swal({
                title: "Deleted!",
                text: res.data.message,
                icon: "success",
                buttons: "OK"
              });
        }
    }

    let studentsData = "";
    if(loading) {
        studentsData = <tr><td colSpan={7}>Loading ...</td></tr>
    }
    else {
        studentsData = students.map((student) => {
            return (
                <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.course}</td>
                    <td>{student.email}</td>
                    <td>{student.phone}</td>
                    <td>
                        <Link to={`edit-student/${student.id}`} className="btn btn-success btn-sm">edit</Link>
                    </td>
                    <td>
                        <button onClick={(e) => deleteStudent(e, student.id) } className="btn btn-danger btn-sm">delete</button>
                    </td>
                </tr>
            );
        });
    }

  return (
    <div className="container">
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header">
                        <h4>
                            Students Data
                            <Link to={'add-student'} className="btn btn-primary btn-sm float-end">Add Student</Link>
                        </h4>
                    </div>
                    <div className="card-body">
                        <table className="table table-bordered table-striped" >
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Course</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>edit</th>
                                    <th>delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studentsData}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Student