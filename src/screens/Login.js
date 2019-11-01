import React, {Component} from 'react';
import '../LoginButton.css';
import ContactService from "../helpers/ContactService";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {value: '', items: [],authenticated: false};
  }

  componentDidMount() {
    // Fetch does not send cookies. So you should add credentials: 'include'

    fetch("http://localhost:8000/api/v1/auth/login/success", {
      method: "GET",
      credentials: "include",
      headers: {Accept: "application/json"}
    }).then(response => {
      console.log("res",response);
      if (response.status === 200)
        return response.json();

      throw new Error("failed to authenticate user");
    }).then(responseJson => {
      console.log("resJ",responseJson);
      this.setState({
        authenticated: true,
        user: responseJson.user
      });
      this.props.history.push('/index',{auth:true});
    }).catch(error => {

      console.log("ere");
      this.setState({
        authenticated: false,
        error: "Failed to authenticate user"
      });
    });

  }

  render() {
    return (
      <div>
        <a href= "http://localhost:8000/api/v1/auth/facebook" className="fb connect">Sign in with Facebook</a>
      </div>
    );
  }

}

export  default Login;