import {css, cx} from '@emotion/css';
import {Slider} from '@mui/material';
import {useEffect} from 'react';
import {useState} from 'react';
import {useRecoilState} from 'recoil';
import {transform} from 'framer-motion';

const FeedController = ({state, labelName, labelLeftName, labelRightName}) => {
  const [{featureValue}, setFeatureValue] = useRecoilState(state);
  const [value, setValue] = useState(5);

  const displayValue = (value) => {
    let v = value;
    if (v >= 5) {
      v = transform([5, 10], [0, 5])(value);
    } else {
      v = 5 - transform([0, 5], [0, 5])(value);
    }
    return `${v.toFixed(2)}`;
  };

  const valuetext = (value) => {
    return `${value}`;
  };

  const handleChange = (event, newValue) => {
    let v = newValue;
    let d = `center`;
    if (v > 5) {
      v = transform([5, 10], [0, 5])(newValue);
      d = `right`;
    } else {
      v = 5 - transform([0, 5], [0, 5])(newValue);
      d = `left`;
    }
    setValue(newValue);
    setFeatureValue({
      featureValue: Number(v.toFixed(2)),
      direction: d,
    });
  };

  return (
    <div
      className={cx(
        `flex items-center gap-6`,
        css`
          .MuiSlider-track {
            opacity: 0 !important;
          }
        `
      )}
    >
      <div className="text-lg">{labelLeftName}</div>
      <Slider
        min={0}
        max={10}
        step={0.01}
        getAriaLabel={() => {
          return `${labelName}`;
        }}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        valueLabelFormat={displayValue}
        getAriaValueText={valuetext}
      />
      <div className="text-lg">{labelRightName}</div>
    </div>
  );
};

export default FeedController;
