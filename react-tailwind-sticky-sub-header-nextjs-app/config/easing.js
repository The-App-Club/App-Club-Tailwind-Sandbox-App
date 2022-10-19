import easing from 'bezier-easing';

const doEaseOutQuart = (x) => {
  // https://easings.net/#easeOutQuart
  return easing(0.25, 1, 0.5, 1)(x);
};

export {doEaseOutQuart};
