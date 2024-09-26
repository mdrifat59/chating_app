import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom"; 
import Loginpage from "../pages/Login";

export default function LoggedInUserRoute(){
    let user = useSelector((state)=>state.login.loggedIn)
    return user? <Outlet/> :  <Loginpage/>
}