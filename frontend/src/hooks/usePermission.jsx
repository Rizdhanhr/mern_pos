import { useSelector } from "react-redux";

export default function usePermission() {
  const permissionArray = useSelector(state => state.user.permission);

  function can(permission) {
    return permissionArray.includes(permission);
  }

  function canAny(permission) {
    return permission.some(permission => permissionArray.includes(permission));
  }

  return {
    permissionArray,
    can,
    canAny
  };
}
