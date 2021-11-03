export const elapsedTime = (elapsed) => {
   const msPerMinute = 60 * 1000;
   const msPerHour = 60 * 60 * 1000;

   if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds';
   } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes';
   } else {
      return (
         Math.floor(elapsed / msPerHour) +
         ' h ' +
         Math.round((elapsed % msPerHour) / msPerMinute) +
         ' m'
      );
   }
};
