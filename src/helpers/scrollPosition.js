export const restoreScrollPosition = ({ type, key }) => {
  const savedScrollPosition = JSON.parse(
    sessionStorage.getItem(`${type}${key}`),
  );

  setTimeout(
    () =>
      window.scrollTo({
        top: Math.abs(savedScrollPosition),
        behavior: 'smooth',
      }),
    2,
  );
};
