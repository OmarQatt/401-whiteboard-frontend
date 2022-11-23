import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import Signin from './components/Signin'
import Signup from './components/Signup'

function App() {
 
  return (
   
    <BrowserRouter>
      <Routes>
       
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;
