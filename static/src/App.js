import React from "react";
import axios from "axios";
require("./css/style.css");
import HeaderBackgroundImage from "./images/header.jpg";

class App extends React.Component {
  state = { data: null };

  componentWillMount() {
    axios.post(`/hello`).then(response => {
      console.log(response);
      this.setState({
        data: response.data
      });
    });
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <p> hello gi {data}</p>
      </div>
    );
  }
}
export default App;
