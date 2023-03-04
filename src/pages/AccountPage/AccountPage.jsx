import { NavLink, Outlet} from 'react-router-dom';
import styles from './AccountPage.module.css';

const AccountPage = () => {
  const activeClass = `${styles.headerActiveBtn} ${styles.link} ${'text text_type_main-medium'}`;
  const inactiveClass = `${'text text_type_main-medium text_color_inactive'} ${styles.link}`;
  return (
    <div className={styles.content}>
      <div className='navbar'>
        <ul className={styles.navLinks}>
          <NavLink
            end to={'/profile'}
            className={({ isActive }) => isActive ? activeClass : inactiveClass}
          >
            Профиль
          </NavLink>
          <NavLink
            end to={'orders'}
            className={({ isActive }) => isActive ? activeClass : inactiveClass}
          >
            История заказов
          </NavLink>
          <NavLink
            end to={'/'}
            className={({ isActive }) => isActive ? activeClass : inactiveClass}
          >
            Выход
          </NavLink>
        </ul>
      </div>
      <Outlet />
    </div>
  )
}

export default AccountPage;
