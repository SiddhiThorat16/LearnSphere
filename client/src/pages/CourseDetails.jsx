// LearnSphere/client/src/pages/CourseDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CourseDetails() {
  const { id } = useParams(); // get course ID from URL params
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/courses/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Updated Enroll handler - handles "Already enrolled" gracefully
  const handleEnroll = async () => {
    setEnrolling(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        return;
      }

      const response = await fetch(`http://localhost:5000/courses/${id}/enroll`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setIsEnrolled(true);
        alert(data.message);
      } else if (data.message === "Already enrolled in this course") {
        setIsEnrolled(true); // Mark as enrolled on frontend
        alert("You are already enrolled in this course! ✅");
      } else {
        alert(data.message || "Enrollment failed");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Network error. Please check if backend is running.");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (!course) return <div className="text-center mt-8">Course not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-indigo-700">{course.title}</h1>
      <p className="mb-4">{course.description}</p>
      <p className="mb-6 font-semibold">
        Instructor: {course.instructor?.name || "N/A"}
      </p>
      {course.videoLinks.length === 0 && <p>No videos available for this course.</p>}
      {course.videoLinks.map((link, index) => (
        <video
          key={index}
          controls
          className="w-full mb-6 rounded shadow-md"
          src={link}
          type="video/mp4"
        >
          Your browser does not support the video tag.
        </video>
      ))}

      <div className="mt-8 p-6 bg-indigo-50 rounded-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to start learning?</h3>
        {isEnrolled ? (
          <div className="text-green-600 font-semibold">✅ You are enrolled in this course!</div>
        ) : (
          <button
            onClick={handleEnroll}
            disabled={enrolling}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 transition"
          >
            {enrolling ? "Enrolling..." : "Enroll Now - Free"}
          </button>
        )}
      </div>
    </div>
  );
}
