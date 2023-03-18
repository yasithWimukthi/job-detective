export const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 30) + 70;
  const lightness = Math.floor(Math.random() * 20) + 40;
  return `hsla(${hue}, ${saturation}%, ${lightness}%, 0.75)`;
};

export default getRandomColor;
