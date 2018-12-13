import React from "react";
import axios from "axios";
require("./css/style.css");
import HeaderBackgroundImage from "./images/header.jpg";

class App extends React.Component {
  state = { state_data: null };

  componentWillMount() {
    axios.post(`/hello`).then(response => {
      console.log(response);
      this.setState({
        state_data: response.data
      });
    });
  }
  render() {
    const { state_data } = this.state;
    return (
      <div>
        <p> Hello from State of {state_data}</p>
        <p>{data} From Flask itself</p>
      </div>
    );
  }
}
export default App;
