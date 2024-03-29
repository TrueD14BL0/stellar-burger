import styles from './RegistrationPage.module.css';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/actions/registerUser';
import { shallowEqual } from 'react-redux';
import { FC, useEffect, useState } from 'react';
import { PAGES } from '../../utils/const';
import { TRegUserData } from '../../services/types/types';
import { useAppDispatch, useAppSelector } from '../../services/hooks/customHooks';

const RegistrationPage: FC = () => {

  const initState = {
    name:'',
    email:'',
    password:'',
  };

  const [value, setValue] = useState<TRegUserData>(initState);
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();

  const { registrationStatus } = useAppSelector(store => ({
    registrationStatus: store.registerUserReducer,
  }), shallowEqual);

  useEffect(()=>{
    if(registrationStatus.status){
      navigate(PAGES.LOGIN_PAGE);
      setValue(initState);
    }
  }, [registrationStatus])

  return (
    <form className={styles.main} onSubmit={(e)=>{
      e.preventDefault();
      dispatch(registerUser(value));
    }}>
      <h2 className={`${styles.text} text text_type_main-medium`}>Регистрация</h2>
      <Input
        type={'text'}
        placeholder={'Имя'}
        size={'default'}
        extraClass="ml-1 pt-6"
        value={value.name}
        onChange={e => setValue({...value,
          name:e.target.value}
        )}
      />
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
      <Button htmlType="submit" type="primary" size="large" extraClass="mt-6">
        Зарегистрироваться
      </Button>
      <p className={`${styles.text} pt-20`}><span className={`text text_type_main-default text_color_inactive`}>Уже зарегистрированы? </span><Link to={PAGES.LOGIN_PAGE} className={styles.link}>Войти</Link></p>
    </form>
  )
}

export default RegistrationPage;
