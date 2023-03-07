import { Button, CloseIcon, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useState, useRef } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { userRequest } from '../../services/actions/userRequest';

const ProfilePage = () => {

  const initState = {
    name:'some',
    email:'some',
    password:'***************',
  };

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);

  const [values, setValues] = useState(initState);
  const dispatch = useDispatch();
  const { userData } = useSelector(store => ({
    userData: store.userReducer,
  }), shallowEqual);

  useEffect(()=>{
    dispatch(userRequest());
  }, [])
  useEffect(()=>{
    setValues(
      {...values,
        name:userData.name,
        email:userData.email,
      }
    );
  }, [userData])

  const inputClickHandler = (ref) =>{
    console.log(ref);
  }

  return (
    <div>
      <Input
        type={'text'}
        placeholder={'Имя'}
        size={'default'}
        extraClass="ml-1"
        value={values.name}
        icon={'EditIcon'}
        disabled = {true}
        ref={nameRef}
        onChange={e => setValues({...values,
          name:e.target.value}
        )}
        onIconClick={()=>inputClickHandler(nameRef)}
      />
      <EmailInput
        onChange={e => setValues({...values,
          email:e.target.value}
        )}
        value={values.email}
        name={'email'}
        placeholder="Логин"
        isIcon={true}
        extraClass="ml-1 pt-6"
      />
      <PasswordInput
        onChange={e => setValues({...values,
          password:e.target.value}
        )}
        value={values.password}
        name={'password'}
        icon="EditIcon"
        extraClass="ml-1 pt-6"
        ref={passRef}
      />
      <div className='pt-6'>
        <Button htmlType="button" type="secondary" size="medium">
          Отмена
        </Button>
        <Button htmlType="button" type="primary" size="medium" onClick={()=>null}>
          Сохранить
        </Button>
      </div>
    </div>
  )
}

export default ProfilePage;
