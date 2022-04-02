import React, { useEffect } from "react";
import Class_Card from "./Class_Card";
import { useUserClass } from "../context/UserClassContext";
import { getMessaging, getToken } from "firebase/messaging";
import app from "../firebase_config";

const Class_Card_Container = () => {
  const messaging = app.messaging();

  useEffect(() => {
    messaging.requestPermission()
    .then(() => {
      return messaging.getToken();
    })
    .then((token) => {
      console.log(token)
    })
  }, []);

  document.title = "Class-Suit";
  const { classes } = useUserClass();
  return (
    <div className="p-10 flex flex-wrap gap-8 justify-center md:justify-start">
      {classes.map((classroom) => {
        return (
          <Class_Card
            key={classroom.id}
            creator={classroom.data.creatorEmail}
            id={classroom.id}
            data={classroom.data}
          />
        );
      })}
    </div>
  );
};

export default Class_Card_Container;
