import styles from './ForgotPassword.module.css';
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { forgotPasswordAction } from '../../services/actions/forgotPassword';
import { useState, useEffect } from 'react';
import Modal from '../../components/Modal/Modal';
import Loader from '../../components/Loader/Loader';
import { getCookie } from '../../components/utils/utils';

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
      setValue('');
      navigate('/reset-password', {state:{reset:true}});
    }
  }, [forgotPassStatus])

  return (
    <>
      <form className={styles.main} onSubmit={(e)=>e.preventDefaut()}>
        <h2 className={`${styles.text} text text_type_main-medium`}>Восстановление пароля</h2>
        <EmailInput
          onChange={e => setValue(e.target.value)}
          value={value}
          name={'email'}
          isIcon={false}
          extraClass="ml-1 pt-6"
          placeholder={'Укажите e-mail'}
        />
        <Button htmlType="button" type="primary" size="large" extraClass="mt-6" onClick={clickHandler}>
          Восстановить
        </Button>
        <p className={`${styles.text} pt-20`}><span className={`text text_type_main-default text_color_inactive`}>Вспомнили пароль? </span><Link to='/login' className={styles.link}>Войти</Link></p>
      </form>
      {forgotPassStatus.loading &&
        <Modal close={null}>
          <Loader/>
        </Modal>}
    </>
  )
}

export default ForgotPassword;
