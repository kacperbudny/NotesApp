import CenteredContainer from "@components/common/CenteredContainer";
import FRONTEND_ROUTES from "@utils/constants/frontendRoutes";
import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <CenteredContainer>
      <h1>Oops!</h1>
      <p>We could not find what you're looking for.</p>
      <Link to={FRONTEND_ROUTES.homePage}>Take me back to the home page</Link>
    </CenteredContainer>
  );
};

export default NotFoundPage;
