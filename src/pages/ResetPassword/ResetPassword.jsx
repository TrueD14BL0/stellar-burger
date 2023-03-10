import styles from './ResetPassword.module.css';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { resetPasswordAction } from '../../services/actions/resetPassword';

const ResetPassword = () => {

  const initState = {
    password:'',
    token:'',
  };
  const [value, setValue] = useState(initState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetPassStatus } = useSelector(store => ({
    resetPassStatus: store.resetPasswordReducer,
  }), shallowEqual);

  const clickHandler = () => {
    dispatch(resetPasswordAction(value));
  }

  useEffect(()=>{
    if(resetPassStatus.status){
      navigate('/login');
      setValue(initState);
    }
  }, [resetPassStatus])

  return (
    <form className={styles.main} onSubmit={(e)=>e.preventDefaut()}>
      <h2 className={`${styles.text} text text_type_main-medium`}>Восстановление пароля</h2>
      <Input
        type={'password'}
        placeholder={'Введите новый пароль'}
        size={'default'}
        extraClass="ml-1 pt-6"
        icon={'ShowIcon'}
        value={value.password}
        onChange={e => setValue({...value,
          password:e.target.value}
        )}
      />
      <Input
        type={'text'}
        placeholder={'Введите код из письма'}
        size={'default'}
        extraClass="ml-1 pt-6"
        value={value.token}
        onChange={e => setValue({...value,
          token:e.target.value}
        )}
      />
      <Button htmlType="button" type="primary" size="large" extraClass="mt-6" onClick={clickHandler}>
        Сохранить
      </Button>
      <p className={`${styles.text} pt-20`}><span className={`text text_type_main-default text_color_inactive`}>Вспомнили пароль? </span><Link to='/login' className={styles.link}>Войти</Link></p>
    </form>
  )
}

export default ResetPassword;
