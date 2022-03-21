import React, { Fragment, useEffect, useState } from "react";
import AddCourse from "./AddCourse";
import EditCourse from "./EditCourse";

const ListCourses = () => {
  const [course, setCourse] = useState([]);

  const deleteCourse = async (id) => {
    try {
      await fetch('https://attendancjyc-backend.herokuapp.com/course/' + id, {
        method: "DELETE",
      }).then(() => {
        setCourse(course.filter((course) => course.id !== id));
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const getCourse = async () => {
    try {
      const response = await fetch(`https://attendancjyc-backend.herokuapp.com/course/`);
      const jsonData = await response.json();
      setCourse(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getCourse();
  });
  const Wrapper = Fragment;
  return (
    <Wrapper>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Codigo curso</th>
            <th>Nombre</th>
            <th>Editar curso</th>
            <th>Eliminar curso</th>
          </tr>
        </thead>
        <tbody>
          {course.map((course) => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.name_co}</td>
              <td>
                <EditCourse todo={course} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteCourse(course.id)}
                >Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddCourse />
    </Wrapper>
  );
};

export default ListCourses;
