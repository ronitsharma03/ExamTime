import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { Loader } from "../Loader/Loader.jsx";
import Navbar from "../Navbar/Navbar.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import { Menu } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Notifcation = () => {
  const { user, setUser } = useContext(UserContext);
  const [requests, setRequests] = useState([]);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    setLoading(false);
  }, [user, navigate]);

  const getRequests = () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      };
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/request`, config)
        .then((res) => {
          setRequests(res.data);
          console.log("data", res.data);
        })
        .catch((error) => {
          toast.error("An error occurred", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <main className="max-w-screen-sm mx-auto m-2 p-4">
        <h1 className="text-2xl font-semibold">Notifications</h1>
        <div className="mt-4">
          {requests &&
            requests
              .slice()
              .reverse()
              .map((request, index) => (
                <div
                  key={index}
                  className="block px-4 py-2 text-sm text-gray-700 border-b-2"
                >
                  <p>{request?.description}</p>
                  <p className="text-[13px] text-end">
                    @{request?.author?.username}
                  </p>
                </div>
              ))}
        </div>
      </main>
    </>
  );
};
export default Notifcation;
