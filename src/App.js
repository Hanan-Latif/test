import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

function App() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    axios.get("https://bgnuerp.online/api/get_my_courses")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("API error:", err));
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const filteredCourses = courses.filter((course) =>
    (course.course_name + course.faculty_name + course.course_code)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className={`container my-4 ${darkMode ? "bg-dark text-white" : ""}`}>
      <div className="text-end mb-3">
        <label htmlFor="darkModeToggle" className="me-2">🌙 Dark Mode</label>
        <input
          type="checkbox"
          id="darkModeToggle"
          checked={darkMode}
          onChange={toggleDarkMode}
        />
      </div>

      {courses.length > 0 && (
        <div className={`p-4 mb-4 rounded ${darkMode ? "bg-secondary" : "bg-light"}`}>
          <h4>Name: <strong>{courses[0].student_name}</strong></h4>
          <p>Father Name: {courses[0].father_name}</p>
          <p>Roll No: <span className="fw-bold text-success">{courses[0].rollno}</span></p>
          <p>Program: {courses[0].program_name} | Shift: {courses[0].shift_name}</p>
        </div>
      )}

      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search courses, faculty, or code..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="row">
        {filteredCourses.map((course, index) => {
          const status = course.feedback_status === "1";
          return (
            <div className="col-12 col-sm-6 col-md-4 mb-4" key={index}>
              <div
                className="card h-100 shadow-sm"
                style={{
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  cursor: "pointer"
                }}
                
              >
                <div className="card-header bg-success text-white">
                  <h5>{course.course_name}</h5>
                  <p className="mb-0">{course.faculty_name}</p>
                </div>
                <div className="card-body">
                  <p><strong>Status:</strong>{" "}
                    <span className={`badge ${status ? "bg-success" : "bg-danger"}`}>
                      {status ? "Submitted" : "Not Submitted"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
