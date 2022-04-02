import "./App.css";
import Navbar from "./component/Navbar";
import Login from "./pages/Login";
import { UserAuthContextProvider, useUserAuth } from "./context/UserAuthContext";
import { UserClassContextProvider } from "./context/UserClassContext";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Class_Card_Container from "./component/Class_Card_Container";
import Classroom from "./pages/Classroom";
import Invite_Class from "./pages/Invite_Class";
import CreateWork from "./pages/CreateWork";
import Alert from "./component/Alert";
import React, { useState } from "react";
import ViewAssignment from "./pages/ViewAssignment";
import Submissions from "./pages/Submissions";
import QuizMain from "./pages/QuizMain";
import Bookmark from "./component/Bookmark";
import Offline from "./pages/Offline";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  const location = useLocation()
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [flag, setflag] = useState(false);
  window.addEventListener("offline", () => {
    call_alert("Please Check Your Internet Connection!!");
    navigate("/offline");
  });
  window.addEventListener("online", () => {
    call_alert("Connected back to internet!!");
    navigate("/");
  });
  const call_alert = (content) => {
    setflag(true);
    setMessage(content);
    const timeout = setTimeout(() => {
      setflag(false);
      clearTimeout(timeout);
    }, 10);
  };
  var r = document.querySelector(':root');
  if (location.pathname.includes('contact')) {
    r.style.setProperty('--bg-color', 'rgb(31, 41, 55 )');
  }
  else {
    r.style.setProperty('--bg-color', 'white');
  }
  return (
    <UserAuthContextProvider>
      <UserClassContextProvider>
        <Navbar />
        {/* <Loading/> */}
        <Alert message={message} flag={flag} messageSetter={setMessage} />
        <Bookmark />

        <Routes>
          <Route path="/" exact element={<Class_Card_Container />} />
          <Route path="/auth" exact element={<Login />} />
          <Route path="/class/:id" exact element={<Classroom />} />
          <Route path="/invite/:id" exact element={<Invite_Class />} />
          <Route path="/assign/:parentID" exact element={<CreateWork />} />
          <Route path="/offline" exact element={<Offline />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/contact" exact element={<Contact />} />
          <Route
            path="/work/:parentID/:workID"
            exact
            element={<ViewAssignment />}
          />
          <Route
            path="/submissions/:parentID/:workID"
            exact
            element={<Submissions />}
          />
          <Route path="/quiz/" exact element={<QuizMain />} />
        </Routes>
      </UserClassContextProvider>
    </UserAuthContextProvider>
  );
}

export default App;
