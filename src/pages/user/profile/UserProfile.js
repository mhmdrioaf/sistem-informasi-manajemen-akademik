import React from "react";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import { useAuth } from "../../../contexts/FirebaseContext";

function UserProfile({ currentUser }) {
  const { logout } = useAuth();

  // TODO: Create user profile page.
  // User Profile page contains: Display name, phone number, address, email, password, profile picture

  if (currentUser) {
    return (
      <>
        <h1>{currentUser.uid}</h1>
        <PrimaryButton onClick={() => logout()}>Logout</PrimaryButton>
      </>
    );
  }

  return <h1>Profile page</h1>;
}

export default UserProfile;
