import React, { Fragment, useEffect, useState } from "react";
import AddCourse from "./AddCourse";

const ListStudents = () => {
  const [student, setStudent] = useState([]);

  const deleteCourse = async (id) => {
    try {
      await fetch('https://attendancjyc-backend.herokuapp.com/student/' + id, {
        method: "DELETE",
      }).then(() => {
        setStudent(student.filter((student) => student.id !== id));
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const getStudent = async () => {
    try {
      const response = await fetch(`https://attendancjyc-backend.herokuapp.com/student/`);
      const jsonData = await response.json();
      setStudent(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getStudent();
  });

  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Programa</th>
            <th>Semestre</th>
          </tr>
        </thead>
        <tbody>
          {student.map((student) => (
            <tr key={student.code}>
              <td>{student.programa}</td>
              <td>{student.semester}</td>
              <td>
                <EditAdmin todo={student} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteCourse(student.id)}
                >
                  Eliminar curso
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddCourse />
    </Fragment>
  );
};

export default ListStudents;
