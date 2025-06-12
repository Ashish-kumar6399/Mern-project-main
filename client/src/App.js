import { Route,Routes } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Header from "./components/Header"
import AddBlog from "./pages/Addblog"
import AddCategory from "./pages/AddCategory"
import SingleBlog from "./pages/Singleblog"
import PrivateRoute from "./services/Protectedroutes"


export default function App() {
  return(
    <>
    <Header/>
    <Routes>

    {/* Protected Routes */}
    <Route path="/" element={<PrivateRoute/>}>
 <Route path="/add-blog" element={<AddBlog/>} />
      <Route path="/add-category" element={<AddCategory/>} />
    </Route>

      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
     
      <Route path="/blog/:id" element={<SingleBlog/>} />
      <Route path="/home" element={<Home/>} />
      
      <Route path="/" element={<Home/>} />
      
    </Routes>
    
    </>
  )
}