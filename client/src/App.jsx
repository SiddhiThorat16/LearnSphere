// LearnSphere/client/src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx"; // Import AuthProvider
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CourseDetails from './pages/CourseDetails';

function App() {
  return (
    <AuthProvider> {/* Wrap whole app with AuthProvider */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/courses" element={<Courses />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
