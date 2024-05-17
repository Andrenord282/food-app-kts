import { FC, PropsWithChildren } from 'react';
import style from './Wrapper.module.scss';

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>{children}</div>
    </div>
  );
};

export default Wrapper;
