import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCookie } from "../../components/utils/utils";

const LogoutPage = () =>{

  const [refreshToken, setValue] = useState(getCookie('refreshToken'));
  const dispatch = useDispatch();

  return !refreshToken ? null : <Navigate to="/" replace/>;

}

export default LogoutPage
