import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ProfilePage.module.css';
import { useState } from 'react';

const ProfilePage = () => {

  const initState = {
    name:'',
    email:'',
    password:'',
  };
  const [value, setValue] = useState(initState);

  return (
    <div>
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
        type={'text'}
        placeholder={'Имя'}
        size={'default'}
        extraClass="ml-1 pt-6"
        value={value.name}
        onChange={e => setValue({...value,
          name:e.target.value}
        )}
      />
    </div>
  )
}

export default ProfilePage;
