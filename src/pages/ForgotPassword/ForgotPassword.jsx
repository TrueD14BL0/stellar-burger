import styles from './ForgotPassword.module.css';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { forgotPasswordAction } from '../../services/actions/forgotPassword';
import { useState, useEffect } from 'react';

const ForgotPassword = () => {

  const [value, setValue] = useState('')
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { forgotPassStatus } = useSelector(store => ({
    forgotPassStatus: store.forgotPasswordReducer,
  }), shallowEqual);

  const clickHandler = () => {
    dispatch(forgotPasswordAction(value));
  }

  useEffect(()=>{
    if(forgotPassStatus.status){
      navigate('/reset-password');
      setValue('');
    }
  }, [forgotPassStatus])

  return (
    <form className={styles.main} onSubmit={(e)=>e.preventDefaut()}>
      <h2 className={`${styles.text} text text_type_main-medium`}>Восстановление пароля</h2>
      <Input
        type={'email'}
        placeholder={'Укажите e-mail'}
        size={'default'}
        extraClass="ml-1 pt-6"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <Button htmlType="button" type="primary" size="large" extraClass="mt-6" onClick={clickHandler}>
        Восстановить
      </Button>
      <p className={`${styles.text} pt-20`}><span className={`text text_type_main-default text_color_inactive`}>Вспомнили пароль? </span><Link to='/login'>Войти</Link></p>
    </form>
  )
}

export default ForgotPassword;
