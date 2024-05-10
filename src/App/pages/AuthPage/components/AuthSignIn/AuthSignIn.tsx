import classNames from 'classnames';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { BaseButton, FormInput } from 'components';
import { rootStore } from 'store';
import useFormSignIn from './hooks/useFormSignIn';
import style from './AuthSignIn.module.scss';

type AuthSignInProps = {
  className?: string;
};

const AuthSignIn: FC<AuthSignInProps> = ({ className }) => {
  const { register, handleSubmit, onSubmit, errors, formValidate } = useFormSignIn();
  const { isLoading } = rootStore.authorization;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classNames(className, style.form)}>
      <div className={style.list}>
        <FormInput
          name="user-email"
          register={register}
          validation={formValidate['user-email']}
          error={errors && errors['user-email']}
          type="email"
          label="Enter your email"
          placeholder="your email"
          className={style.item}
        />
        <FormInput
          name="user-password"
          register={register}
          validation={formValidate['user-password']}
          error={errors['user-password']}
          label="Enter your password"
          type="password"
          autoComplete="new-password"
          placeholder="your password"
          className={style.item}
        />
      </div>
      <BaseButton disabled={isLoading} loading={isLoading}>
        Enter
      </BaseButton>
    </form>
  );
};

export default observer(AuthSignIn);
