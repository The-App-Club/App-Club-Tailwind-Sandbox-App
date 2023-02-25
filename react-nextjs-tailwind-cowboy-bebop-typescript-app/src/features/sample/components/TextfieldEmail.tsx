import clsx from 'clsx'
import { useController, UseControllerProps } from 'react-hook-form'

import { SignInForm } from '@/features/sample/stores/signInForm'

const TextfieldEmail = (props: UseControllerProps<SignInForm>) => {
  const {
    field,
    fieldState: { error },
  } = useController(props)
  console.log(`[TextfieldEmail]`, error)
  return (
    <div className='mb-6'>
      <label
        htmlFor='email'
        className='mb-2 block text-lg font-medium text-gray-600 dark:text-white'
      >
        メールアドレス
      </label>
      <input
        type='email'
        id='email'
        className={clsx(
          `block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-lg font-bold`,
          `focus:outline-none focus:ring-1`,
          `focus:border-blue-500 focus:ring-blue-500`,
          `focus-visible:border-blue-500 focus-visible:ring-blue-500`,
          `dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500`
        )}
        placeholder='name@flowbite.com'
        required
        {...field}
      />
      <p>{!!error && error.message}</p>
    </div>
  )
}

export default TextfieldEmail
