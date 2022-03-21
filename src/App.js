import "./App.css";
import Navbar from "./component/Navbar";
import Login from "./pages/Login";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import { UserClassContextProvider } from "./context/UserClassContext";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Class_Card_Container from "./component/Class_Card_Container";
import Classroom from "./pages/Classroom";
import Bookmark from "./component/Bookmark";
import Invite_Class from "./pages/Invite_Class";
import UploadFiles from "./pages/UploadFiles";
import CreateWork from "./pages/CreateWork";

function App() {
  return (
    <UserAuthContextProvider>
      <UserClassContextProvider>
      <Navbar />
      {/* <Bookmark/> */}

      <Routes>
        <Route path="/" exact element={<Login/>} />
        <Route path="/class" exact element={<Class_Card_Container/>} />
        <Route path="/class/:id" exact element={<Classroom/>} />
        <Route path="/invite/:id" exact element={<Invite_Class/>} />
        <Route path="/assign" exact element={<UploadFiles/>} />
      </Routes>
      </UserClassContextProvider>
    </UserAuthContextProvider>
  );
}

export default App;
