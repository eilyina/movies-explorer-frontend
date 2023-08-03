
import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, ...props }) => {
  // console.log(`protected ${props.loggedIn}`)
  return (
    props.loggedIn ? <Component {...props} /> : <Navigate to="/" replace />
  )
}

export default ProtectedRouteElement;