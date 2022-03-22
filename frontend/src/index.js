import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Pages/Login';
import Staff from './Pages/Staff';
import Admin from './Pages/Admin';
import Courses from './Pages/Courses';
import Student from './Pages/Students';
import {BrowserRouter as Router,Route, Routes} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import ListStudents from './Components/ListStudents';

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/staff' element={<Staff/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/courses' element={<Courses/>}/>
          <Route path='/students' element={<Student/>}/>
          <Route path='/addst' element={<ListStudents/>}/>
        </Routes>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
