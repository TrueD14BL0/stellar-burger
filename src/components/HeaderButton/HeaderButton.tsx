import styles from './HeaderButton.module.css';
import { NavLink } from 'react-router-dom';
import { FC, ReactNode } from 'react';

interface IHeaderButton {
  text: string,
  linkTo: string,
  children?: ReactNode,
  addClass?: string,
}

const HeaderButton:FC<IHeaderButton> = ({ text, linkTo, children, addClass }) => {
  const addingClass: string = addClass ? styles[addClass] : '';
  const classes = `${styles.button} p-5 pt-4 pb-4 ${addingClass}`;
  return (
    <NavLink
      to={linkTo}
      className={({ isActive }) => isActive ? `${styles.headerActiveBtn} ${classes}` : `${styles.headerInactiveBtn} ${classes}`}
    >
      {children}
      <p className='text text_type_main-default'>{text}</p>
    </NavLink>
  )
}

export default HeaderButton;
