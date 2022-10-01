import {css, cx} from '@emotion/css';
import {useEffect, useState} from 'react';
import {MdWbSunny, MdNightlightRound} from 'react-icons/md';
import {useRecoilState} from 'recoil';
import themeState from '../stores/themeStore';

const ThemeToggle = ({className}) => {
  const [theme, setTheme] = useRecoilState(themeState);
  const [checked, setChecked] = useState(theme.checked);

  const handleChange = (e) => {
    setChecked(e.target.checked);
    if (e.target.checked) {
      const html = document.documentElement;
      html.classList.remove('light');
      html.classList.add('dark');
      setTheme({mode: 'dark', checked: true});
    } else {
      const html = document.documentElement;
      html.classList.remove('dark');
      html.classList.add('light');
      setTheme({mode: 'light', checked: false});
    }
  };

  return (
    <div
      className={css`
        --light: #eeeeee;
        --dark: #a5c9ca;
        position: relative;
        width: 55px;
        height: 3rem;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <label
        className={css`
          position: absolute;
          width: 100%;
          height: 32px;
          background-color: var(--light);
          border-radius: 50px;
          cursor: pointer;
        `}
      >
        <input
          id="toggle"
          name="toggle"
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          className={css`
            position: absolute;
            display: none;
            &:checked ~ .slider {
              background-color: var(--dark);
            }
            &:checked ~ .slider::before {
              transform: translateX(20px);
              content: url('data:image/svg+xml;base64,PHN2ZyBzdHJva2U9ImN1cnJlbnRDb2xvciIgZmlsbD0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgY29sb3I9IiMxQzM4NzkiIGhlaWdodD0iMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHlsZT0iY29sb3I6IHJnYigyOCwgNTYsIDEyMSk7Ij48cGF0aCBmaWxsPSJub25lIiBkPSJNMCAwaDI0djI0SDBWMHoiPjwvcGF0aD48cGF0aCBkPSJNMTIuMDEgMTJjMC0zLjU3IDIuMi02LjYyIDUuMzEtNy44Ny44OS0uMzYuNzUtMS42OS0uMTktMS45LTEuMS0uMjQtMi4yNy0uMy0zLjQ4LS4xNC00LjUxLjYtOC4xMiA0LjMxLTguNTkgOC44M0M0LjQ0IDE2LjkzIDkuMTMgMjIgMTUuMDEgMjJjLjczIDAgMS40My0uMDggMi4xMi0uMjMuOTUtLjIxIDEuMS0xLjUzLjItMS45QTguNDYgOC40NiAwIDAxMTIuMDEgMTJ6Ij48L3BhdGg+PC9zdmc+');
            }
          `}
        />
        <span
          className={cx(
            css`
              position: absolute;
              width: 100%;
              height: 100%;
              border-radius: 50px;
              transition: 0.3s;
              &::before {
                content: url('data:image/svg+xml;base64,PHN2ZyBzdHJva2U9ImN1cnJlbnRDb2xvciIgZmlsbD0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgY29sb3I9IiNGRkMyM0MiIGhlaWdodD0iMjQiIHdpZHRoPSIyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHlsZT0iY29sb3I6IHJnYigyNTUsIDE5NCwgNjApOyI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgyNHYyNEgweiI+PC9wYXRoPjxwYXRoIGQ9Ik02Ljc2IDQuODRsLTEuOC0xLjc5LTEuNDEgMS40MSAxLjc5IDEuNzkgMS40Mi0xLjQxek00IDEwLjVIMXYyaDN2LTJ6bTktOS45NWgtMlYzLjVoMlYuNTV6bTcuNDUgMy45MWwtMS40MS0xLjQxLTEuNzkgMS43OSAxLjQxIDEuNDEgMS43OS0xLjc5em0tMy4yMSAxMy43bDEuNzkgMS44IDEuNDEtMS40MS0xLjgtMS43OS0xLjQgMS40ek0yMCAxMC41djJoM3YtMmgtM3ptLTgtNWMtMy4zMSAwLTYgMi42OS02IDZzMi42OSA2IDYgNiA2LTIuNjkgNi02LTIuNjktNi02LTZ6bS0xIDE2Ljk1aDJWMTkuNWgtMnYyLjk1em0tNy40NS0zLjkxbDEuNDEgMS40MSAxLjc5LTEuOC0xLjQxLTEuNDEtMS43OSAxLjh6Ij48L3BhdGg+PC9zdmc+');
                position: absolute;
                top: 4px;
                left: 8px;
                width: 24px;
                height: 24px;
                transition: transform 0.3s ease-in-out;
              }
            `,
            `slider`
          )}
        ></span>
      </label>
    </div>
  );
};

export default ThemeToggle;
