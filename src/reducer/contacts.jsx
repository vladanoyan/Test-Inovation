const contacts = (state = [], action) => {
  switch (action.type) {
    case 'DATA':
      console.log('dispatch Worked !!!');
      return [
        ...action.dataFetch,
      ];
    case 'ADD_USER':
      return [
        ...state,
        {
          body: action.body,
          name: action.name,
          email: action.email,
          id: action.ky,
          postId: action.ky,
        },
      ];
    case 'DEL_USER':
      return state.filter(element => element.id !== action.num);
    case 'UPDATE':
      return [
        ...state,
      ];
    default:
      return state;
  }
};
export default contacts;
