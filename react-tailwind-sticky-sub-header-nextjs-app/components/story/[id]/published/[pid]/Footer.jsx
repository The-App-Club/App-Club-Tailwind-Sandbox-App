import {cx} from '@emotion/css';
import {useRouter} from 'next/router';

const Footer = () => {
  const router = useRouter();
  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <div
          className={cx(
            `w-full flex justify-center flex-col items-center`,
            `border-2  rounded-lg shadow-lg p-2`
          )}
        >
          <p>
            Do you like this story? If you like, Subscribe then, Copy this
            story.
          </p>

          <button
            className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-28 text-sm text-center"
            onClick={(e) => {
              router.push({
                pathname: `/subscribe`,
              });
            }}
          >
            Subscribe
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div
          className={cx(
            `w-full flex justify-center flex-col items-center`,
            `border-2  rounded-lg shadow-lg p-2`
          )}
        >
          <p>Do you like this story? Let&apos;s vote.</p>

          <div className="w-full flex items-center justify-center gap-2">
            <button
              className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-28 text-sm text-center"
              onClick={(e) => {}}
            >
              Up vote
            </button>

            <button
              className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-28 text-sm text-center"
              onClick={(e) => {}}
            >
              Down vote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
