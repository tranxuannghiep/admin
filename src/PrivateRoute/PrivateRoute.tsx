import { ROUTES } from "configs/routes";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { AUTH } from "utils/constants";

export interface PrivateRouteProps {
  children: ReactElement;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  if (Boolean(localStorage.getItem(AUTH))) {
    return children;
  }
  return <Navigate to={ROUTES.login} />;
}
