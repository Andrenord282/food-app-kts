import { FC, useCallback, useState } from 'react';
import { SwitchButtonList } from 'components';
import AuthSignIn from './components/AuthSignIn';
import AuthSignUp from './components/AuthSignUp';
import style from './AuthPage.module.scss';

export type FormName = 'sign-in' | 'sign-up';

const buttons = [
  { name: 'sign-in', text: 'sign in' },
  { name: 'sign-up', text: 'sign up' },
];

const AuthPage: FC = () => {
  const [currentForm, setCurrentForm] = useState<FormName>('sign-in');

  const handleSwitchForm = useCallback((formName: string) => {
    setCurrentForm(formName as FormName);
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.section}>
          <div className={style.content}>
            <SwitchButtonList buttons={buttons} switchButton={handleSwitchForm} className={style.switcher} />
            {currentForm === 'sign-in' && <AuthSignIn />}
            {currentForm === 'sign-up' && <AuthSignUp />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
