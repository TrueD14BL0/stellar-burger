import styles from './ForgotPassword.module.css';
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { forgotPasswordAction } from '../../services/actions/forgotPassword';
import { useState, useEffect, FC } from 'react';
import Modal from '../../components/Modal/Modal';
import Loader from '../../components/Loader/Loader';
import { AppThunk, RootState } from '../../services/types/types';
import { PAGES } from '../../utils/const';

const ForgotPassword: FC = () => {

  const [value, setValue] = useState<string>('')
  const dispatch: AppThunk = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const { forgotPassStatus } = useSelector((store: RootState) => ({
    forgotPassStatus: store.forgotPasswordReducer,
  }), shallowEqual);

  useEffect(()=>{
    if(forgotPassStatus.status){
      setValue('');
      navigate(PAGES.RESET_PAGE, {state:{reset:true}});
    }
  }, [forgotPassStatus])

  return (
    <>
      <form className={styles.main} onSubmit={(e)=>{
        e.preventDefault();
        dispatch(forgotPasswordAction(value));
      }}>
        <h2 className={`${styles.text} text text_type_main-medium`}>Восстановление пароля</h2>
        <EmailInput
          onChange={e => setValue(e.target.value)}
          value={value||''}
          name={'email'}
          isIcon={false}
          extraClass="ml-1 pt-6"
          placeholder={'Укажите e-mail'}
        />
        <Button htmlType="submit" type="primary" size="large" extraClass="mt-6">
          Восстановить
        </Button>
        <p className={`${styles.text} pt-20`}><span className={`text text_type_main-default text_color_inactive`}>Вспомнили пароль? </span><Link to={PAGES.LOGIN_PAGE} className={styles.link}>Войти</Link></p>
      </form>
      {forgotPassStatus.loading &&
        <Modal>
          <Loader/>
        </Modal>}
    </>
  )
}

export default ForgotPassword;
