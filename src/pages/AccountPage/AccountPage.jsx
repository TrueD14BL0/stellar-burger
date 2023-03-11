import { NavLink, Outlet} from 'react-router-dom';
import { LOGOUT_PAGE, ORDERS_PAGE, PROFILE_PAGE } from '../../utils/const';
import styles from './AccountPage.module.css';

const AccountPage = () => {
  const activeClass = `${styles.headerActiveBtn} ${styles.link} ${'text text_type_main-medium'}`;
  const inactiveClass = `${'text text_type_main-medium text_color_inactive'} ${styles.link}`;

  return (
    <div className={styles.content}>
      <div className={styles.navbar}>
        <ul className={styles.navLinks}>
          <NavLink
            end to={PROFILE_PAGE}
            className={({ isActive }) => isActive ? activeClass : inactiveClass}>
            Профиль
          </NavLink>
          <NavLink
            end to={ORDERS_PAGE}
            className={({ isActive }) => isActive ? activeClass : inactiveClass}>
            История заказов
          </NavLink>
          <NavLink
            end to={LOGOUT_PAGE}
            className={({ isActive }) => isActive ? activeClass : inactiveClass}>
            Выход
          </NavLink>
        </ul>
        <p className={`${styles.annotation} pt-20 text text_type_main-default text_color_inactive`}>В этом разделе вы можете изменить&nbsp;свои персональные данные</p>
      </div>
      <Outlet />
    </div>
  )
}

export default AccountPage;
