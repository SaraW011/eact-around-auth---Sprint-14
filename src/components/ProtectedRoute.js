// HOC wrapper component
// always returns a Route component
import React from 'react';
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props  }) => {
  return (
    // if the value of loggedIn is equal to true, the Route will render
    <Route>
      {
        () => props.loggedIn ? <Component {...props} /> : <Navigate to="/signin" />
      }
    </Route>
)}

// const ProtectedRoute = ({ children, loggedIn, ...props }) => {
//   return (
//       <Route {...props}>
//           {loggedIn ? children : <Navigate to="/signin" />}
//       </Route>
//   );
// };


export default ProtectedRoute;
