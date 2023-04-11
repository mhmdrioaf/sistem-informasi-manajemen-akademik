import React from "react";
import { useAuth } from "../../contexts/FirebaseContext";
import PrimaryButton from "../../components/buttons/PrimaryButton";

function Dashboard() {
  const { logout } = useAuth();
  return (
    <>
      <PrimaryButton onClick={logout}>Logout</PrimaryButton>
    </>
  );
}

export default Dashboard;
