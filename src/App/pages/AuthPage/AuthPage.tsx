import { FC } from 'react';
import AuthSignUp from './components/AuthSignUp';
import style from './AuthPage.module.scss';

const AuthPage: FC = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.section}>
          <AuthSignUp />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
