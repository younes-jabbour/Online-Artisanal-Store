import React from "react";
import { useUserContext } from "./context/UserContext";

const Test = () => {
  const { userInfo, logout } = useUserContext();
  const handleClick = () => {
    console.log(userInfo);
  };
  return (
    <div>
      <p>id: {userInfo.id}</p>
      <p>type: {userInfo.type}</p>
      <button onClick={handleClick} className="bg-blue-gray-600">
        logout
      </button>
    </div>
  );
};

export default Test;
