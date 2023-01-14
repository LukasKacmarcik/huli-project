import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";

interface Props {
  allowedId: string;
}

const RequireAuth: React.FC<Props> = ({ allowedId }) => {
  const location = useLocation();
  const session = useAppSelector((state) => state.session);
  if (session.status === "loading") {
    return null;
  }
  return allowedId === session.id ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
