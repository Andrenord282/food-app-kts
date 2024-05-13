import { FormEventHandler } from 'react';
import { useForm, SubmitHandler, FieldValues, UseFormRegister, FieldErrors } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { rootStore } from 'store';

type AuthFormSignUp = {
  'user-email': AuthFormSignUpValidation | string;
  'user-name': AuthFormSignUpValidation | string;
  'user-password': AuthFormSignUpValidation | string;
  'confirm-password': AuthFormSignUpValidation | string;
};

export enum SignUpResponse {
  success = 'success',
  nameExists = 'auth/name-already-in-use',
  emailExists = 'auth/email-already-in-use',
}

type AuthFormSignUpValidation = {
  // required: string;
  // pattern?: {
  //   value: RegExp;
  //   message: string;
  // };
  // minLength?: {
  //   value: number;
  //   message: string;
  // };
  // validate?: Record<string, (value: string) => string | boolean>;
};

type UseFormSignUp<TFieldValues extends FieldValues> = {
  register: UseFormRegister<TFieldValues>;
  handleSubmit: (onSubmit: SubmitHandler<TFieldValues>) => FormEventHandler<HTMLFormElement>;
  onSubmit: SubmitHandler<TFieldValues>;
  setError: (name: keyof TFieldValues, error: { message: string }) => void;
  errors: FieldErrors<AuthFormSignUp>;
  formValidate: { [key in keyof TFieldValues]: AuthFormSignUpValidation };
};

const useFormSignUp = (): UseFormSignUp<AuthFormSignUp> => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<AuthFormSignUp>();
  const navigate = useNavigate();

  const formValidate = {
    'user-email': {
      required: 'required field',
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: 'not valid mail',
      },
    },
    'user-name': {
      required: 'required field',
      pattern: {
        value: /^[a-zA-Z0-9]+$/,
        message: 'use the symbols: A-Z, a-z, 0-9',
      },
      minLength: {
        value: 3,
        message: 'user name must be at least 3 characters long',
      },
    },
    'user-password': {
      required: 'required field',
      validate: {
        minLength: (value: string) => value.length >= 6 || 'password must be at least 6 characters long',
        latinOnly: (value: string) => /^[A-Za-z0-9]+$/.test(value) || 'use the symbols: A-Z, a-z, 0-9',
      },
    },
    'confirm-password': {
      required: 'required field',
      validate: {
        matchPassword: (value: string) => value === watch('user-password') || 'passwords don`t match',
      },
    },
  };

  const onSubmit: SubmitHandler<AuthFormSignUp> = async (data) => {
    const response = await rootStore.authorization.signUp({
      displayName: data['user-name'] as string,
      email: data['user-email'] as string,
      password: data['user-password'] as string,
    });

    if (response.code === SignUpResponse.success) {
      navigate('/');
      return;
    }

    if (response.code === SignUpResponse.emailExists) {
      setError('user-email', { message: 'email already in use' });
      return;
    }

    if (response.code === SignUpResponse.nameExists) {
      setError('user-name', { message: 'name already in use' });
      return;
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

export default useFormSignUp;
