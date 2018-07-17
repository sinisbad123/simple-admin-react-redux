const defaultUserInfo = {
  name: 'Demo User',
  image: 'http://demos.creative-tim.com/light-bootstrap-dashboard-pro/assets/img/default-avatar.png'
};

const auth = (state = {}, action) => {
  switch (action.type) {
    default:
      state.user = defaultUserInfo;
      return state;
  }
}

export default auth;