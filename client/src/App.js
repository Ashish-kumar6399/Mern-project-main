import { Route,Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Header from "./components/Header"
import AddBlog from "./pages/Addblog"
import AddCategory from "./pages/AddCategory"
import SingleBlog from "./pages/Singleblog"

export default function App() {
  return(
    <>
    <Header/>
    <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/add-blog" element={<AddBlog/>} />
      <Route path="/add-category" element={<AddCategory/>} />
      <Route path="/blog/:id" element={<SingleBlog/>} />
      
      <Route path="/" element={<Home/>} />
      
    </Routes>
    
    </>
  )
}