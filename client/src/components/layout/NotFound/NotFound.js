import CenteredContainer from "@components/common/CenteredContainer/CenteredContainer";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <CenteredContainer>
      <h1>Oops!</h1>
      <p>We could not find what you're looking for.</p>
      <Link to="/">Take me back to the home page</Link>
    </CenteredContainer>
  );
};

export default NotFound;
