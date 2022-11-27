const sleep = ({waitSeconds = 1}: {waitSeconds: number}) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, 1000 * waitSeconds);
  });
};

export {sleep};
