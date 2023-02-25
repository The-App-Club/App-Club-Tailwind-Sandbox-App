import clsx from 'clsx'
import Link from 'next/link'

const Home = () => {
  return (
    <section className='mx-auto w-full max-w-2xl'>
      <h1
        className={clsx(
          `text-3xl font-bold underline`,
          `flex items-center justify-center`
        )}
      >
        Hello world!
      </h1>
      <h1
        className={clsx(
          `text-2xl font-bold`,
          `underline`,
          `flex items-center justify-center`
        )}
      >
        Hello world!
      </h1>
      <div className={clsx(`flex items-center justify-center`)}>
        <Link href={'/sample'} className={clsx(`underline`)}>
          Sample
        </Link>
      </div>
    </section>
  )
}

export default Home
