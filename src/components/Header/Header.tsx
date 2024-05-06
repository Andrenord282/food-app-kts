import { FC } from 'react';
import { Link } from 'react-router-dom';
import Text from 'components/Text';
import BaseLogoIcon from 'components/icons/BaseLogoIcon';
import FavoriteIcon from 'components/icons/FavoriteIcon';
import ProfileIcon from 'components/icons/ProfileIcon';
import { ROUTS } from 'config/routs';

import style from './Header.module.scss';

const Header: FC = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
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
          <Link to={ROUTS.AUTH}>
            <ProfileIcon width={24} height={24} color="accent" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
