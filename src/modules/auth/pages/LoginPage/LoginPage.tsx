import { ILoginParams } from "models/auth";
import LoginForm from "modules/auth/components/LoginForm/LoginForm";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "redux/reducer";
import "./LoginPage.scss";
import { Action } from "redux";
import { fetchThunk } from "modules/common/redux/thunk";
import { API_PATHS } from "configs/api";
import { Navigate, useNavigate } from "react-router-dom";
import { ROUTES } from "configs/routes";
import { AUTH } from "utils/constants";

export interface LoginProps {}

export default function Login(props: LoginProps) {
  const dispatch =
    useDispatch<ThunkDispatch<RootState, null, Action<string>>>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onLogin = useCallback(
    async (values: ILoginParams) => {
      setLoading(true);
      const json = await dispatch(
        fetchThunk(API_PATHS.signIn, "post", {
          email: values.email,
          password: values.password,
        })
      );
      setLoading(false);
      if (json?.success === true) {
        localStorage.setItem("user", JSON.stringify(json.user));
        localStorage.setItem(AUTH, json.user_cookie);
        setTimeout(()=>{
          navigate(ROUTES.manageUser);
        },1000)
        // return;
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem(AUTH);
        alert(json?.errors?.email);
      }
    },
    [dispatch, navigate]
  );
  if (Boolean(localStorage.getItem(AUTH))) {
    return <Navigate to={ROUTES.manageUser} />;
  }
  return (
    <div id="LoginPage">
      <LoginForm onLogin={onLogin} />
      {loading && (
        <div className="loading">
          <div className="spinner-border text-light mr-2" role="status" />
        </div>
      )}
    </div>
  );
}
