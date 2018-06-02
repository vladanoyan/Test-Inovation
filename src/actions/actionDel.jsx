export const actionDel = (num) => dispatch => {
  setTimeout(() => {
    console.log('setTimeOut worked');
    dispatch({ type: 'DEL_USER', num });
  }, 2000);
};
