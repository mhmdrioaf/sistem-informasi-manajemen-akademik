import React from "react";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useAuth } from "../../contexts/FirebaseContext";
import { useNavigate } from "react-router-dom";

function Home() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = async (e) => {
    e.preventDefault();

    logout()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return <PrimaryButton onClick={logoutHandler}>Logout</PrimaryButton>;
}

export default Home;
