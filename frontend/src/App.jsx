import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ForgetPasswordPage from './ForgotPasswordPage';
import User from './components/User';
function App(){
 return(
    <Router>
    <Routes>
     <Route path="/" element={<Login/>}/>
     <Route path='/register' element={<Register/>}/>
     <Route path='/forgot-password' element={<ForgetPasswordPage/>}/>
     <Route path='/user' element={<User/>}/>
     </Routes>
 </Router>
 )
}
export default App
