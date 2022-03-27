import React from "react";
import { ref, getStorage, listAll, deleteObject } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../firebase_config";

const Announcement_Box = ({ work, deleteFunc, parentId }) => {
  const navigate = useNavigate();
  const storage = getStorage();
  const { data, id } = work;

  const handleClick = async () => {
    const q = query(
      collection(db, "classes", `${parentId}`, "work", `${id}`, "submissions")
    );
    const querySnapshot = await getDocs(q);
    let submissionArr = [];
    querySnapshot.forEach((doc) => {
      submissionArr.push(doc.data());
    });
    deleteFunc(id, data.email, data.creatorEmail);
    submissionArr.forEach((itemRef) => {
      const listRef = ref(
        storage,
        `/${parentId}/${id}/Submissions/${itemRef.email}`
      );
      listAll(listRef)
        .then((res) => {
          res.items.forEach((itemRef) => {
            const deleteRef = ref(storage, itemRef.fullPath);
            deleteObject(deleteRef)
              .then(() => {
                console.log("file deleted successfully");
              })
              .catch((error) => {
                console.log(error);
              });
          });
          const listRef = ref(storage, `/${parentId}/${id}/`);
          listAll(listRef)
            .then((res) => {
              res.items.forEach((itemRef) => {
                const deleteRef = ref(storage,  itemRef.fullPath);
                deleteObject(deleteRef)
                  .then(() => {
                    console.log("file deleted successfully")
                  })
                  .catch((error) => {
                    console.log(error)
                  });
              });
            })
            .catch((error) => {
              console.log(error);
            });
          })
          .catch((error) => {
            console.log(error);
          });
        });
  };
  return (
    <div className="w-full border-2 rounded-md text-base border-gray-300  mb-4">
      <div className="bg-slate-600 rounded text-gray-200 p-4 py-2 flex justify-between items-center">
        <div>
          <p className="font-semibold">{data.user}</p>
          <p className="text-xs">{data.date}</p>
        </div>
        <div>
          <i
            className="cursor-pointer bi bi-trash3-fill"
            onClick={handleClick}
          ></i>
        </div>
      </div>
      <hr className="mb-2 bg-slate-600" />
      <p className="p-4 py-2">
        {typeof data.data === "string" ? (
          data.data
        ) : (
          <a
            onClick={() => {
              navigate(`/work/${parentId}/${id}/`);
            }}
            className="text-blue-600 duration-200 cursor-pointer text-base font-bold"
          >
            {data.title}
          </a>
        )}
      </p>
    </div>
  );
};

export default Announcement_Box;
