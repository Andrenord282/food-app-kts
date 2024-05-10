import { FormEventHandler } from 'react';
import { useForm, SubmitHandler, FieldValues, UseFormRegister, FieldErrors } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { rootStore } from 'store';

type AuthFormSignIn = {
  'user-email': AuthFormSignInValidation | string;
  'user-password': AuthFormSignInValidation | string;
};

type AuthFormSignInValidation = {
  required: string;
  pattern?: {
    value: RegExp;
    message: string;
  };
};

export enum SignInResponse {
  success = 'success',
  invalidCredential = 'auth/invalid-credential',
}

type UseFormSignIn<TFieldValues extends FieldValues> = {
  register: UseFormRegister<TFieldValues>;
  handleSubmit: (onSubmit: SubmitHandler<TFieldValues>) => FormEventHandler<HTMLFormElement>;
  onSubmit: SubmitHandler<TFieldValues>;
  setError: (name: keyof TFieldValues, error: { message: string }) => void;
  errors: FieldErrors<AuthFormSignIn>;
  formValidate: { [key in keyof TFieldValues]: AuthFormSignInValidation };
};

const useFormSignIn = (): UseFormSignIn<AuthFormSignIn> => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<AuthFormSignIn>();
  const navigate = useNavigate();

  const formValidate = {
    'user-email': {
      required: 'required field',
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: 'not valid mail',
      },
    },
    'user-password': {
      required: 'required field',
    },
  };

  const onSubmit: SubmitHandler<AuthFormSignIn> = async (data) => {
    const response = await rootStore.authorization.signIn({
      email: data['user-email'] as string,
      password: data['user-password'] as string,
    });

    if (response.code === SignInResponse.success) {
      navigate('/');
      return;
    }

    if (response.code === SignInResponse.invalidCredential) {
      setError('user-email', { message: 'invalid credential' });
      setError('user-password', { message: 'invalid credential' });
      return
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    setError,
    errors,
    formValidate,
  };
};

export default useFormSignIn;
