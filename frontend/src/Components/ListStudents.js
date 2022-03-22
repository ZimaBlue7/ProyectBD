import React, { Fragment, useEffect, useState } from "react";
import EditStudent from "./EditStudent";

const ListStudents = () => {
  const [student, setStudent] = useState([]);

  const deleteStudent = async (id) => {
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
      const response = await fetch('https://attendancjyc-backend.herokuapp.com/student/');
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
            <th>Semestre</th>
            <th>Programa</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {student.map((students) => (
            <tr key={students.code}>
              <td>{students.code}</td>
              <td>{students.semester}</td>
              <td>{students.programa}</td>
              <td>
              <EditStudent todo={students} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteStudent(students.code)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListStudents;