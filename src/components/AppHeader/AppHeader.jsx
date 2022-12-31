import './AppHeader.css'
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import HeaderButton from '../HeaderButton/HeaderButton'

const AppHeader = () => {
  return (
    <header className='header pl-80 pr-80 pt-4 pb-4'>
      <nav className='main-menu'>
        <li className='main-menu__list-item'>
          <HeaderButton text="Конструктор" addedClass="header__active-btn">
            <BurgerIcon type='primary'/>
          </HeaderButton>
        </li>
        <li className='main-menu__list-item'>
          <HeaderButton text="Лента заказов" addedClass="header__inactive-btn">
            <ListIcon type='secondary' />
          </HeaderButton>
        </li>
      </nav>
      <Logo />
      <HeaderButton text="Личный кабинет" addedClass="header__inactive-btn">
        <ProfileIcon type='secondary' />
      </HeaderButton>

    </header>
  )
}

export default AppHeader;
