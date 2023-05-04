import { Location, NavLink, Outlet, Params, useLocation, useParams} from 'react-router-dom';
import { PAGES } from '../../utils/const';
import styles from './AccountPage.module.css';
import { FC } from 'react';

const AccountPage: FC = () => {
  const activeClass: string = `${styles.headerActiveBtn} ${styles.link} ${'text text_type_main-medium'}`;
  const inactiveClass: string = `${'text text_type_main-medium text_color_inactive'} ${styles.link}`;
  const location: Location = useLocation();
  const params: Readonly<Params<string>> = useParams();

  return (params.id&&!(location.state&&location.state.modal))?
    (<Outlet/>):
    (
      <div className={styles.content}>
        <div className={styles.navbar}>
          <ul className={styles.navLinks}>
            <NavLink
              end to={PAGES.PROFILE_PAGE}
              className={({ isActive }) => isActive ? activeClass : inactiveClass}>
              Профиль
            </NavLink>
            <NavLink
              end to={PAGES.ORDERS_PAGE}
              className={({ isActive }) => isActive ? activeClass : inactiveClass}>
              История заказов
            </NavLink>
            <NavLink
              end to={PAGES.LOGOUT_PAGE}
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
