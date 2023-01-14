import React from "react";
import { Navigate } from "react-router-dom";
const ProtectedRout = ({ children }) => {
  let user = false;
  if (!user) return <Navigate to="/" />;
  return children;
};

export default ProtectedRout;
