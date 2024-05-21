import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTS } from 'config/routs';

type PrivateRouteProps = {
  userIdentified: boolean;
};

const PrivateRoute: FC<PrivateRouteProps> = ({ userIdentified }) => {
  return userIdentified ? <Outlet /> : <Navigate replace to={ROUTS.AUTH} />;
};

export default PrivateRoute;
