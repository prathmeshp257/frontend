import React, { ReactNode } from "react";
import PropTypes from "prop-types";
import { AuthProvider } from "./userContext";

interface MainProviderProps {
  children: ReactNode;
}

const MainProvider: React.FC<MainProviderProps> = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

MainProvider.propTypes = {
  children: PropTypes.node,
};

export { MainProvider };
