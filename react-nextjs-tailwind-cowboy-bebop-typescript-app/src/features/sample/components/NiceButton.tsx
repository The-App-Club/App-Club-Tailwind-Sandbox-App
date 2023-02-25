import clsx from 'clsx'

const NiceButton = () => {
  return (
    <button
      type='submit'
      className={clsx(
        `w-full rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700`,
        `focus:outline-none focus:ring-1`,
        `focus:border-blue-700 focus:ring-blue-700`,
        `focus-visible:border-blue-700 focus-visible:ring-blue-700`,
        `dark:bg-blue-300 dark:hover:bg-blue-300 dark:focus:ring-blue-300`
      )}
    >
      Default
    </button>
  )
}

export default NiceButton
