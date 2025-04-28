import { useSelector, useDispatch } from "react-redux";
import { removeToken, getToken } from "../utils/authHelper";
import { logout } from "../store/userSlice";

export default function useAuth() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.userInfo);
  const token = getToken();
  const isAuthenticated = !!token;

  function handleLogout() {
    removeToken();
    dispatch(logout());
  }

  return { user, isAuthenticated, handleLogout };
}
