import { css, cx } from "@emotion/css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header
      className={cx(
        css`
          z-index: 1;
          height: 3rem;
        `,
        `sticky w-full top-0 bg-white`
      )}
    >
      <div className={`relative w-full`}>
        <div
          className={cx(
            css`
              z-index: 1;
            `,
            `absolute top-0 left-0 flex justify-center items-center hover:cursor-pointer`
          )}
          onClick={(e) => {
            navigate("/", {
              state: {},
            });
          }}
        >
          <img src={logo} alt={`logo`} className={"h-12"} />
          <h5>Tokimeki Lion</h5>
        </div>
      </div>
    </header>
  );
};

export { Header };
