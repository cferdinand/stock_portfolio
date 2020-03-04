const login = (state = 0, action) => {
  switch (action.type) {
    case "LOGGEDIN":
      return state;
    case "NOTLOGGEDIN":
      return 0;
    default:
      return state;
  }
};

export default login;
