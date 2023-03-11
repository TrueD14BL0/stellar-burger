import styles from './LoginPage.module.css';
import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../services/actions/loginActions';
import { getCookie, setTokenCookies } from '../../components/utils/utils';
import { LOGIN_CLEAR } from '../../utils/const';

const LoginPage = () => {

  const initState = {
    email:'',
    password:'',
  };

  const [value, setValue] = useState(initState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loginData } = useSelector(store => ({
    loginData: store.loginReducer,
  }), shallowEqual);

  const [isLogin, setLogin] = useState(false);

  useEffect(()=>{
    if(getCookie('refreshToken')){
      setLogin(true);
    }
  },[]);

  useEffect(()=>{
    if(loginData.status){
      setTokenCookies(loginData.token, loginData.refreshToken);
      dispatch({type: LOGIN_CLEAR,});
      navigate(location.state&&location.state.prev ? location.state.prev : '/');
    }
  }, [loginData]);

  return !isLogin ?
    (
      <form className={styles.main} onSubmit={(e)=>{
        e.preventDefault();
        dispatch(loginAction(value));
      }}>
        <h2 className={`${styles.text} text text_type_main-medium`}>Вход</h2>
        <EmailInput
          onChange={e => setValue({...value,
            email:e.target.value}
          )}
          value={value.email}
          name={'email'}
          isIcon={false}
          extraClass="ml-1 pt-6"
        />
        <PasswordInput
          onChange={e => setValue({...value,
            password:e.target.value}
          )}
          value={value.password}
          name={'password'}
          extraClass="ml-1 pt-6"
        />
        <Button htmlType="submit" type="primary" size="large" extraClass="mt-6">
          Войти
        </Button>
        <p className={`${styles.text} pt-20`}><span className={`text text_type_main-default text_color_inactive`}>Вы - новый пользователь? </span><Link to='/register' className={styles.link}>Зарегистрироваться</Link></p>
        <p className={`${styles.text} pt-4`}><span className={`text text_type_main-default text_color_inactive`}>Забыли пароль? </span><Link to='/forgot-password' className={styles.link}>Восстановить пароль</Link></p>
      </form>
    )
    : <Navigate to="/" replace/>;
}

export default LoginPage;
