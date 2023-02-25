import { useMemo } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  SignInForm,
  SignInFormSchema,
} from '@/features/sample/stores/signInForm'

const useSignInForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    control,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<SignInForm>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(SignInFormSchema),
    mode: 'all',
  })

  return useMemo(() => {
    return {
      control,
      reset,
      getValues,
      setValue,
      register,
      handleSubmit,
      errors,
      isValid,
    }
  }, [
    control,
    reset,
    getValues,
    setValue,
    register,
    handleSubmit,
    errors,
    isValid,
  ])
}

export default useSignInForm
