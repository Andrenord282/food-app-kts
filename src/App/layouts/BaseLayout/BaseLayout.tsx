import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'components/Header';
import { useQueryParamsStoreInit } from 'store/RootStore/hooks/useQueryParamsStoreInit';

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
