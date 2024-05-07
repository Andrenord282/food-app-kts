import classNames from 'classnames';
import { FC } from 'react';
import { BaseButton, FormInput } from 'components';
import useFormSignUp from './hooks/useFormSignUp';
import style from './AuthSignUp.module.scss';

type AuthSignUpProps = {
  className?: string;
};

const AuthSignUp: FC<AuthSignUpProps> = ({ className }) => {
  const { register, handleSubmit, onSubmit, setError, errors, formValidate } = useFormSignUp();

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
          name="user-name"
          register={register}
          validation={formValidate['user-name']}
          error={errors && errors['user-name']}
          type="text"
          label="Enter your name"
          placeholder="your name"
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
        <FormInput
          name="confirm-password"
          register={register}
          validation={formValidate['confirm-password']}
          error={errors['confirm-password']}
          label="Repeat your password"
          type="password"
          autoComplete="new-password"
          placeholder="repeat password"
          className={style.item}
        />
      </div>
      <BaseButton>Registration</BaseButton>
    </form>
  );
};

export default AuthSignUp;
