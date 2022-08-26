import {css, cx} from '@emotion/css';
import {useEffect} from 'react';
import useDarkMode from 'use-dark-mode';
import {MdWbSunny, MdNightlightRound} from 'react-icons/md';

const ThemeToggle = ({className}) => {
  // return (
  //   <>
  //     <MdWbSunny size={24} color={'#FFC23C'} />
  //     <MdNightlightRound size={24} color={'#1C3879'} />
  //   </>
  // );

  const darkMode = useDarkMode(false);

  useEffect(() => {
    if (darkMode.value) {
      const html = document.documentElement;
      html.classList.add('dark');
    } else {
      const html = document.documentElement;
      html.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div
      className={cx(
        css`
          position: absolute;
          top: 0.5rem;
          right: 3.75rem;
          z-index: 1;
        `,
        className
      )}
    >
      <div
        className={css`
          --light: #eeeeee;
          --dark: #a5c9ca;
          position: relative;
          width: 55px;
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
            checked={darkMode.value}
            onChange={darkMode.toggle}
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
    </div>
  );
};

export {ThemeToggle};
