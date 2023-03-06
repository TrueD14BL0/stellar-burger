import styles from './LoginPage.module.css';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../services/actions/authActions';
import { deleteCookie, setCookie } from '../../components/utils/utils';

const LoginPage = () => {

  const initState = {
    email:'',
    password:'',
  };

  const [value, setValue] = useState(initState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginData } = useSelector(store => ({
    loginData: store.loginReducer,
  }), shallowEqual);

  const clickHandler = () => {
    dispatch(loginAction(value));
  }

  useEffect(()=>{
    if(loginData.status){
      setCookie('token', loginData.token, {
        'max-age': 1200
      });
      setCookie('refreshToken', loginData.refreshToken);
      navigate('/');
    }else{
      deleteCookie('token');
      deleteCookie('refreshToken');
    }
  }, [loginData])

  return (
    <form className={styles.main} onSubmit={(e)=>e.preventDefaut()}>
      <h2 className={`${styles.text} text text_type_main-medium`}>Вход</h2>
      <Input
        type={'email'}
        placeholder={'E-mail'}
        size={'default'}
        extraClass="ml-1 pt-6"
        value={value.email}
        onChange={e => setValue({...value,
          email:e.target.value}
        )}
      />
      <Input
        type={'password'}
        placeholder={'Пароль'}
        size={'default'}
        extraClass="ml-1 pt-6"
        icon={'ShowIcon'}
        value={value.password}
        onChange={e => setValue({...value,
          password:e.target.value}
        )}
      />
      <Button htmlType="button" type="primary" size="large" extraClass="mt-6" onClick={clickHandler}>
        Войти
      </Button>
      <p className={`${styles.text} pt-20`}><span className={`text text_type_main-default text_color_inactive`}>Вы - новый пользователь? </span><Link to='/register'>Зарегистрироваться</Link></p>
      <p className={`${styles.text} pt-4`}><span className={`text text_type_main-default text_color_inactive`}>Забыли пароль? </span><Link to='/forgot-password'>Восстановить пароль</Link></p>
    </form>
  )
}

export default LoginPage;
