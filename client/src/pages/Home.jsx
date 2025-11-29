// LearnSphere/client/src/pages/Home.jsx
import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-white">
      <h1 className="text-4xl font-extrabold text-indigo-800 mb-4">
        Welcome to LearnSphere
      </h1>
      <p className="text-lg text-gray-700 mb-8 max-w-xl text-center">
        Explore expert-led courses, learn collaboratively, and expand your skills with our modern platform.
      </p>

      {/* Buttons Section */}
      <div className="flex space-x-4">
        <a
          href="/courses"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded shadow transition"
        >
          Browse Courses
        </a>
        <a
          href="/login"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded shadow transition"
        >
          Login
        </a>
        <a
          href="/signup"
          className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded shadow transition"
        >
          Signup
        </a>
      </div>
    </div>
  );
}