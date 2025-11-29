// LearnSphere/client/src/pages/Courses.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/courses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch courses");
        }
        return res.json();
      })
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-indigo-700 mb-8">Available Courses</h2>
      {loading ? (
        <div className="text-center text-lg text-gray-600">Loading...</div>
      ) : courses.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col hover:shadow-xl transition"
            >
              <h3 className="text-2xl font-semibold text-indigo-800 mb-2">{course.title}</h3>
              <p className="text-gray-700 mb-3">{course.description}</p>
              <span className="text-sm text-indigo-500">
                Instructor: {course.instructor?.name || "N/A"}
              </span>
              <Link
                to={`/courses/${course._id}`}
                className="mt-4 inline-block text-indigo-600 hover:underline"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500 col-span-2">No courses available yet.</div>
      )}
    </div>
  );
}
