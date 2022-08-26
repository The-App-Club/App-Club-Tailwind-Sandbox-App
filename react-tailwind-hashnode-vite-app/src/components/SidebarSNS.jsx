import {css, cx} from '@emotion/css';
import {SocialIcon} from 'react-social-icons';

const SidebarSNS = ({className = css``}) => {
  return (
    <div className="flex items-center gap-1 pt-4">
      <SocialIcon
        className={css`
          width: 32px !important;
          height: 32px !important;
        `}
        url="https://twitter.com/napzak5"
        target={'_blank'}
        referrerPolicy={'no-referrer'}
      />
      <SocialIcon
        className={css`
          width: 32px !important;
          height: 32px !important;
        `}
        url="https://www.tiktok.com/@napzak5"
        target={'_blank'}
        referrerPolicy={'no-referrer'}
      />
      <SocialIcon
        className={css`
          width: 32px !important;
          height: 32px !important;
        `}
        url="https://www.buymeacoffee.com/higashikota"
        target={'_blank'}
        referrerPolicy={'no-referrer'}
      />
      <SocialIcon
        className={css`
          width: 32px !important;
          height: 32px !important;
        `}
        url="https://www.youtube.com/channel/UCg-qojAbSiu3cfgCpvuh80w"
        target={'_blank'}
        referrerPolicy={'no-referrer'}
      />
    </div>
  );
};

export {SidebarSNS};
