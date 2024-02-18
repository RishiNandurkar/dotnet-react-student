import axios from "axios";
import { useEffect, useState } from "react";

function StudentCrud() {

  const [id, setId] = useState("");
  const [stname, setName] = useState("");
  const [course, setCourse] = useState("");
  const [students, setUsers] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get("https://localhost:7129/api/Student/");
    setUsers(result.data);
    console.log(result.data);
  }

  async function save(event) {

    event.preventDefault();
    try {
      await axios.post("https://localhost:7129/api/Student/", {

        stname: stname,
        course: course,

      });
      alert("Record Added Successfully");
      setId("");
      setName("");
      setCourse("");
      Load();
    } catch (err) {
      alert(err);
    }
  }

  async function editStudent(students) {
    setName(students.stname);
    setCourse(students.course);
    setId(students.id);
    setIsEditMode(true);
  }
  async function DeleteStudent(id) {
    await axios.delete("https://localhost:7129/api/Student/" + id);
    alert("Record has been deleted Successfully");
    setId("");
    setName("");
    setCourse("");
    Load();
    setIsEditMode(false);
  }
  async function update(event) {
    event.preventDefault();
    try {

      await axios.put("https://localhost:7129/api/Student/" + students.find((u) => u.id === id).id || id,
        {
          id: id,
          stname: stname,
          course: course,

        }
      );
      alert("RRecord Updated Succesfully ");
      setId("");
      setName("");
      setCourse("");
      Load();
      setIsEditMode(false);
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <h1>Student Details</h1>
      <div class="container">
        <form>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="id"
              hidden
              value={id}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />

            <table className="first">
              <tr>
                <td>
                  <label>Student Name</label>
                </td>
                <td>
                  <input
                    type="text"
                    class="form-npm start
              control"
                    id="stname"
                    value={stname}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Course</label>

                </td>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    id="course"
                    value={course}
                    onChange={(event) => {
                      setCourse(event.target.value);
                    }}
                  />

                </td>

              </tr>
              <tr>
                <td id="register">
                  <button class="btn btn-primary mt-4" onClick={save}disabled={isEditMode} >
                  Add info
                </button>
                </td>
                <td id="update">
                  <button class="btn btn-warning mt-4" onClick={update}>
                    Update info
                  </button>

                </td>
              </tr>
            </table>

          </div>
          <div class="form-group">
          </div>
          <div>

          </div>
        </form>
      </div>
      <br></br>

      <table class="table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">Regs No </th>
            <th scope="col">Student Name</th>
            <th scope="col">Course</th>


            <th scope="col">Option</th>
          </tr>
        </thead>
        <tbody>
        {students.map(function fn(student) {
          return (
              <tr className="second">
                <td scope="row">{student.id} </td>
                <td>{student.stname}</td>
                <td>{student.course}</td>

                <td id="last">
                  <button
                    type="button"
                    class="btn-warning"
                    onClick={() => editStudent(student)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn-danger"
                    onClick={() => DeleteStudent(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
          );
        })}
        </tbody>
      </table>

    </div>
  );
}

export default StudentCrud;