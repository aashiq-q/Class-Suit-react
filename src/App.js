import "./App.css";
import Navbar from "./component/Navbar";
import Login from "./pages/Login";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import { UserClassContextProvider } from "./context/UserClassContext";
import { Routes, Route  } from "react-router-dom";
import Class_Card_Container from "./component/Class_Card_Container";
import Classroom from "./pages/Classroom";
import Invite_Class from "./pages/Invite_Class";
import CreateWork from "./pages/CreateWork";
import Alert from "./component/Alert";
import { useState } from "react";
import ViewAssignment from "./pages/ViewAssignment";
import LoadingScreen from "./component/LoadingScreen";

function App() {

  const [message, setMessage] = useState("");
  const [flag, setflag] = useState(false);
  window.addEventListener('offline', ()=> {
    call_alert("Please Check Your Internet Connection!!")
  })
  window.addEventListener('online', ()=> {
    call_alert("Connected back to internet!!")
  })
  const call_alert = (content) => {
    setflag(true);
    setMessage(content);
    const timeout = setTimeout(() => {
      setflag(false);
      clearTimeout(timeout);
    }, 10);
  };
  return (
    <UserAuthContextProvider>
      <UserClassContextProvider>
      <Navbar />
      <Alert message={message} flag={flag} messageSetter={setMessage}/>
      {/* <Bookmark/> */}

      <Routes>
        <Route path="/" exact element={<Login/>} />
        <Route path="/class" exact element={<Class_Card_Container/>} />
        <Route path="/class/:id" exact element={<Classroom/>} />
        <Route path="/invite/:id" exact element={<Invite_Class/>} />
        <Route path="/assign/:parentID" exact element={<CreateWork/>} />
        <Route path="/work/:parentID/:workID" exact element={<ViewAssignment/>} />
      </Routes>
      </UserClassContextProvider>
    </UserAuthContextProvider>
  );
}

export default App;
