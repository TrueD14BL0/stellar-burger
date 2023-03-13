import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState, useRef } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { userDataPatch, userRequest } from '../../services/actions/userActions';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {

  const nameRef = useRef(null);
  const [nameVal, setNameVal] = useState('');
  const [emailVal, setEmailVal] = useState('');
  const [passVal, setPassVal] = useState('*************');
  const [userDataChange, setUserDataChange] = useState(null);
  const [values, setValues] = useState({});
  const dispatch = useDispatch();
  const { userData } = useSelector(store => ({
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
    setUserDataChange(null);
  }, [userData])

  const inputClickHandler = (curRef) => {
    curRef.current.disabled = false;
    curRef.current.focus();
    curRef.current.classList.remove('input__textfield-disabled');
  }

  const onFocusHandler = () => {
    if(passVal==='*************'){
      setPassVal('');
    }
  }

  const onChangeHandler = (val, func) => {
    setUserDataChange(true);
    func(val);
  }

  const cancelBtnHandler = () => {
    setValuesFromUserData();
    setUserDataChange(null);
  }

  const submitHandler = () => {
    const newUserData = {};
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
    <form onSubmit={(e)=>{
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
          nameRef.current.disabled = true;
          nameRef.current.classList.add('input__textfield-disabled');
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
