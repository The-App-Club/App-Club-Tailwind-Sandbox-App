import {css, cx} from '@emotion/css';
import {Spacer} from './Spacer';
import {TrendingTags} from './TrendingTags';
import {SidebarSNS} from './SidebarSNS';
import {SidebarMenu} from './SidebarMenu';

const Sidebar = ({className = css``}) => {
  return (
    <aside
      className={cx(
        css`
          max-width: 20rem;
          width: 100%;
          min-height: 40rem;
        `,
        `border-2  p-2 rounded-lg mb-2`,
        className
      )}
    >
      <SidebarMenu />
      <Spacer />
      <div className="w-full">
        <TrendingTags />
        <SidebarSNS />
      </div>
      <footer className="border-t-2 pt-4 pb-2 mt-6">
        <span className="flex justify-center items-center">{`@copyright ${new Date().getFullYear()} Make YourSelf`}</span>
      </footer>
    </aside>
  );
};

export {Sidebar};
