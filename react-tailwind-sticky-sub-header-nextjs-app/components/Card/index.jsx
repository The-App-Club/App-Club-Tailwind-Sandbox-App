import {cx} from '@emotion/css';

import styles from './index.module.scss';

const Card = () => {
  return (
    <div>
      <h2 className={cx(styles.Card__header)}>Hello</h2>
    </div>
  );
};

export default Card;
