import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from 'react-router-dom';
import './secrete.css';

export default function Cards() {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [user, setUser] =useState (null);
  const [error, setError] = useState(null);
  // params Unique id
  const {userId} = useParams();


  useEffect(() => {
    console.log('user id:', userId)
    axios.get(`http://localhost:4000/user/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError("Error fetching user detail");
      });
  }, [userId]);


  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/sign");
        } else
          toast(`Hi ${data.user} 🦄`, {
            theme: "dark",
          });
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/");
  };
  return (
    <>
      <div className="private">
        <h1>Super Secret Page</h1>
        {user && (
        <div className="CardProfile">
       
          <div className="CardProfile-container">
             <div className="info-profile">
              <p>My applications</p>
              <h3>0</h3>
             </div>
          </div>
         
          <div className="CardProfile-container">
             <div className="info-profile">
              <p>My name</p>
              <h3>{user.name}</h3>
             </div>
          </div>
        
          <div className="CardProfile-container">
             <div className="info-profile">
              <p>Profile look</p>
              <h3>yes</h3>
             </div>
          </div>
          <div className="CardProfile-container">
             <div className="info-profile">
              <p>upload my cv</p>
              <h3></h3>
             </div>
          </div>
         
        </div>
     
      )}
        <button onClick={logOut}>Log out</button>

      </div>
      <ToastContainer />
    </>
  );
}