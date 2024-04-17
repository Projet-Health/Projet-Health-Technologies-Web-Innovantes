import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../contexts/auth.context";

export const PrivateRoutes = () => {
    const { user } = useAuth();
    return user ? <Outlet/> : <Navigate to="/"/>;
};

export const PublicRoutes = () => {
    const { user } = useAuth();
    return user ? <Navigate to="/patients"/> : <Outlet/>
};