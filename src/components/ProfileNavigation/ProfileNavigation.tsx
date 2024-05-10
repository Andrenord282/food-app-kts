import { FC } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Icon, FavoriteIcon, ProfileIcon, ShopBasketIcon, SignOutIcon } from 'components';
import { ROUTS } from 'config/routs';
import { rootStore } from 'store';
import style from './ProfileNavigation.module.scss';

const ProfileNavigation: FC = () => {
  const handleSignOut = () => {
    rootStore.authorization.signOut();
  };

  return (
    <div className={style.item}>
      <Link to={ROUTS.FAVORITE} className={style.link}>
        <Icon width={17} height={17} viewBox="0 0 19 19">
          <FavoriteIcon color="accent" />
        </Icon>
      </Link>
      <Link to={ROUTS.SHOP_BASKET} className={style.link}>
        <Icon width={22} height={22} viewBox="0 0 512 512">
          <ShopBasketIcon color="accent" />
        </Icon>
      </Link>
      <Link to={ROUTS.PROFILE} className={style.link}>
        <Icon>
          <ProfileIcon color="accent" />
        </Icon>
      </Link>
      <IconButton padding="none" onClick={handleSignOut}>
        <Icon viewBox="0 0 512 512">
          <SignOutIcon />
        </Icon>
      </IconButton>
    </div>
  );
};

export default ProfileNavigation;
