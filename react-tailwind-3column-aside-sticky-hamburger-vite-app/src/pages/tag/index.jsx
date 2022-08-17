import {css, cx} from '@emotion/css';
import {default as Layout} from '../../layouts/default';
import {useLocation} from 'react-router-dom';
import {TagPageLayout} from '../../layouts/tag';

const TagPage = ({pageName, notifier}) => {
  const location = useLocation();
  const {state} = location;
  return (
    <TagPageLayout pageName={pageName} notifier={notifier}>
      <div
        className={cx(
          css``,
          `max-w-7xl mx-auto w-full relative flex flex-col items-center`
        )}
      >
        <h2 className="text-3xl flex items-center justify-center">TagPage</h2>
        <p>{state.tag}</p>
      </div>
    </TagPageLayout>
  );
};

export {TagPage};
