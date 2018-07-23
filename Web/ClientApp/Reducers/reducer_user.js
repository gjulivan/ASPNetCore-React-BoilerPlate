const initialState = {
    isAuthenticated: false
}

const mockData = {
  userid: '1',
  maininfo: {
      username: 'kinzarra',
      lastname: 'Shayzhanov',
      firstname: 'Philipp',
      birthday: '08.12.1987',
      gender: 'male',
      phone: '+79164727241',
      email: 'kinzarra@yandex.ru'
  },
  status: {
      lastvisit: '26.12.2017 19-23',
      totalbtcvalue: '0.5',
      totalusdvalue: '2300.45',
  },
  security: {
      faauth: 'enabled',
      phoneverification: 'verified',
      emailnotification: 'unverified',
  },
}

function UserReducer(state = initialState, action) {
  switch (action.type) {
    case 'AUTH_SUCCESS':
      return {
        ...state,
        ...Object.assign({}, mockData, {
          maininfo: {
            ...mockData.maininfo,
            username: action.payload.username,
            email: action.payload.email,
          }, token: action.payload.token }),
        isAuthenticated: true
      }
    case 'AUTH_FAIL':
      return initialState
    default:
      return state
  }
}

export default UserReducer;
