import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Loader } from 'components';
import { rootStore } from 'store/index';
import style from './BaseLayout.module.scss';

const BaseLayout: FC = () => {
  if (rootStore.user.userInitial) {
    return (
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.information}>
            <Loader iconSize="l" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default observer(BaseLayout);
