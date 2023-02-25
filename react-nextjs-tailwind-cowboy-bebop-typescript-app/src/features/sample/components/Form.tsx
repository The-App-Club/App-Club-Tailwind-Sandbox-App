import clsx from 'clsx'

import NiceButton from '@/features/sample/components/NiceButton'
import TextfieldEmail from '@/features/sample/components/TextfieldEmail'
import TextfieldPassword from '@/features/sample/components/TextfieldPassword'
import useSignInForm from '@/features/sample/hooks/useSignInForm'
import { SignInForm } from '@/features/sample/stores/signInForm'

const Form = () => {
  const { handleSubmit, control } = useSignInForm()

  const onSubmit = (data: SignInForm) => {
    console.log(data)
  }

  return (
    <form
      className={clsx(`w-full max-w-full`)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextfieldEmail name='email' control={control} />
      <TextfieldPassword name='password' control={control} />
      <NiceButton />
    </form>
  )
}

export default Form
