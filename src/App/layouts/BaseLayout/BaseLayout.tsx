import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'components/';

const BaseLayout: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export { BaseLayout };
