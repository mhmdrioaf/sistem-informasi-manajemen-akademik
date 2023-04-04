import React from "react";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useAuth } from "../../contexts/FirebaseContext";

function Dashboard() {
  const { logout } = useAuth();

  return (
    <>
      <PrimaryButton onClick={logout}>Logout</PrimaryButton>
    </>
  );
}

export default Dashboard;
