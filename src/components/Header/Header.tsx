import { FC } from 'react';
import { ROUTS } from 'config/routs';
import { Link } from 'react-router-dom';
import FavoriteIcon from 'components/icons/FavoriteIcon';
import ProfileIcon from 'components/icons/ProfileIcon';
import { Text, BaseLogoIcon } from 'components/';

import style_gl from 'styles/global.module.scss';
import style from './Header.module.scss';

const Header: FC = () => {
  return (
    <div className={style.wrapper}>
      <div className={style_gl['container--m']}>
        <div className={style.content}>
          <Link to={ROUTS.INDEX} className={style.logo}>
            <BaseLogoIcon width={36} height={36} />
            <Text tag="span" weight="700" view="p-l" color="primary">
              Food Client
            </Text>
          </Link>
          <Link to={ROUTS.FAVORITE} className={style.favorite}>
            <FavoriteIcon width={18} height={18} color="accent" />
          </Link>
          <Link to={ROUTS.PROFILE}>
            <ProfileIcon width={24} height={24} color="accent" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export { Header };
