import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState, useRef, RefObject, FC } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { userDataPatch, userRequest } from '../../services/actions/userActions';
import styles from './ProfilePage.module.css';
import { AppThunk, RootState, TPatchUserData, TUserData } from '../../services/types/types';

const ProfilePage: FC = () => {

  const nameRef: RefObject<HTMLInputElement> = useRef(null);
  const [nameVal, setNameVal] = useState<string>('');
  const [emailVal, setEmailVal] = useState<string>('');
  const [passVal, setPassVal] = useState<string>('*************');
  const [userDataChange, setUserDataChange] = useState<boolean>(false);
  const [values, setValues] = useState<TPatchUserData>({});
  const dispatch: AppThunk = useDispatch();
  const { userData } = useSelector((store:RootState) => ({
    userData: store.userReducer,
  }), shallowEqual);

  const setValuesFromUserData = () => {
    setNameVal(userData.name);
    setEmailVal(userData.email);
    setPassVal('*************');
  }

  useEffect(()=>{
    dispatch(userRequest());
  }, [])
  useEffect(()=>{
    setValues(
      {...values,
        name:userData.name,
        email:userData.email,
        password: '*************',
      }
    );
    setValuesFromUserData();
    setUserDataChange(false);
  }, [userData])

  const inputClickHandler = (curRef: RefObject<HTMLInputElement>) => {
    if(curRef.current){
      curRef.current.disabled = false;
      curRef.current.focus();
      curRef.current.classList.remove('input__textfield-disabled');
    }
  }

  const onFocusHandler = () => {
    if(passVal==='*************'){
      setPassVal('');
    }
  }

  const onChangeHandler = (val: string, func: (val: string)=>void) => {
    setUserDataChange(true);
    func(val);
  }

  const cancelBtnHandler = () => {
    setValuesFromUserData();
    setUserDataChange(false);
  }

  const submitHandler = () => {
    const newUserData: TPatchUserData = {};
    if(nameVal!==values.name){
      newUserData.name = nameVal;
    }
    if(emailVal!==values.email){
      newUserData.email = emailVal;
    }
    if(passVal!==values.password){
      newUserData.password = passVal;
    }
    dispatch(userDataPatch(newUserData));
  }

  return (
    <form className={styles.profileForm}  onSubmit={(e)=>{
      e.preventDefault();
      submitHandler();
    }}>
      <Input
        type={'text'}
        ref={nameRef}
        placeholder={'Имя'}
        size={'default'}
        extraClass="ml-1"
        value={nameVal||''}
        icon={'EditIcon'}
        disabled = {true}
        onChange={e => onChangeHandler(e.target.value, setNameVal)}
        onIconClick={()=>inputClickHandler(nameRef)}
        onBlur={()=>{
          if(nameRef.current){
            nameRef.current.disabled = true;
            nameRef.current.classList.add('input__textfield-disabled');
          }
        }}
      />
      <EmailInput
        onChange={e => onChangeHandler(e.target.value, setEmailVal)}
        value={emailVal||''}
        name={'email'}
        placeholder="Логин"
        isIcon={true}
        extraClass="ml-1 pt-6"
      />
      <PasswordInput
        onChange={e => onChangeHandler(e.target.value, setPassVal)}
        value={passVal||'*************'}
        name={'password'}
        icon="EditIcon"
        extraClass="ml-1 pt-6"
        onFocus={()=>onFocusHandler()}
      />
      {userDataChange && <div className={`${styles.buttonsBar} pt-6`}>
        <Button htmlType="button" type="secondary" size="medium" onClick={cancelBtnHandler}>
          Отмена
        </Button>
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
      </div>}
    </form>
  )
}

export default ProfilePage;
