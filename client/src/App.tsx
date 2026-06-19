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




export default function App() {
  return (
    <BrowserRouter>
      <Routes>
         {/* Login — no navbar/footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
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