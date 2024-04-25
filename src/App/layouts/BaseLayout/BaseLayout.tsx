import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'components';
import { useQueryParamsStoreInit } from 'store/RootStore/hooks';

const BaseLayout: FC = () => {
  useQueryParamsStoreInit();
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default BaseLayout;
