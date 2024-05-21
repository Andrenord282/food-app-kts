import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { Text, ProfileNavigation, Icon, BaseLogoIcon, SignInIcon } from 'components';
import { ROUTS } from 'config/routs';
import { rootStore } from 'store';
import 'react-loading-skeleton/dist/skeleton.css';
import style from './Header.module.scss';

const Header: FC = () => {
  const { userInitial, userIdentified, userUnknown } = rootStore.user;

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.content}>
          <Link to={ROUTS.INDEX} className={style.logo}>
            <Icon width={36} height={36} viewBox="0 0 36 36">
              <BaseLogoIcon width={36} height={36} />
            </Icon>
            <Text tag="span" weight="700" view="p-l" color="primary">
              Food Client
            </Text>
          </Link>
          {userInitial && (
            <SkeletonTheme baseColor="#b5460f54" highlightColor="#b5460f80">
              <Skeleton width={145} height={22} />
            </SkeletonTheme>
          )}
          {userIdentified && <ProfileNavigation />}
          {userUnknown && (
            <Link to={ROUTS.AUTH} className={style.link}>
              <Icon viewBox="0 0 512 512">
                <SignInIcon color="accent" />
              </Icon>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(Header);
