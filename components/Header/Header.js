import Link from 'next/link';
import { BiExit } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/actions/userActions';
import { defaultImageUrl } from '../../utils/constants';
import RouterButton from '../RouterButton/RouterButton';
import styles from './header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);

  const handleLogoutUser = () => {
    dispatch(logoutUser());
  };

  return (
    <header className={styles.header}>
      <Link href='/'>
        <p className='link'>Blog App</p>
      </Link>
      <div className={styles.header__container}>
        {user && (
          <div className={styles.header__info}>
            <p>{`${user.first_name} ${user.last_name}`}</p>
            <p>{user.email}</p>
          </div>
        )}
        <Link
          className='link'
          href={user ? '/account' : '/login'}
        >
          <img
            className={styles.header__image}
            src={user?.avatar || defaultImageUrl}
            alt='Profile icon'
          />
        </Link>
        {user ? (
          <>
            <RouterButton
              link='/newarticle'
              title='New Article'
            />
            <button
              onClick={handleLogoutUser}
              className={styles.header__logoutContainer}
            >
              <BiExit className={styles.header__logout} />
            </button>
          </>
        ) : (
          <Link href='/login'>Login</Link>
        )}
      </div>
    </header>
  );
};
export default Header;
