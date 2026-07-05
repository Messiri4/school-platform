import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Admissions from "./pages/Admissions";
import Academics from "./pages/Academics";
import Gallery from "./pages/Gallery";
import News from "./pages/News";
import Contact from "./pages/Contact";
import NurserySchool from "./pages/NurserySchool";
import PrimarySchool from "./pages/PrimarySchool";
import SecondarySchool from "./pages/SecondarySchool";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

import StudentDashboard from "./pages/student/StudentDashboard";
import ParentDashboard from "./pages/parent/ParentDashboard";
import StaffDashboard from "./pages/staff/StaffDashboard";

import Pending from "./pages/Pending";

import ProtectedRoute from "./components/ProtectedRoute";
import RequireAuth from "./components/RequireAuth";




export default function App() {
  return (
    <BrowserRouter>
      <Routes>
         {/* Login — no navbar/footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/pending" element={<Pending />} />

        {/* Dashboard router — requires login */}
        <Route path="/dashboard" element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        } />

        {/* Protected portals — role based */}
        <Route path="/dashboard/admin" element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/student" element={
          <ProtectedRoute allowedRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/parent" element={
          <ProtectedRoute allowedRole="parent">
            <ParentDashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/staff" element={
          <ProtectedRoute allowedRole="staff">
            <StaffDashboard />
          </ProtectedRoute>
        } />

        {/* Public routes — with navbar/footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/admissions" element={<Admissions />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/academics/nursery" element={<NurserySchool />} />
          <Route path="/academics/primary" element={<PrimarySchool />} />
          <Route path="/academics/secondary" element={<SecondarySchool />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}