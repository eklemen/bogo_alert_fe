import axios from "axios/index";

export async function checkUser(){
  const {user, cookies, history} = this.props;
  const token = cookies.get('bogoUserToken');
  if (!user.data.token) {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return true;
    } else {
      history.push('/login');
    }
  }
}

