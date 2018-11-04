import React from "react";
import axios from "axios";

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
    return <p> Hello React!</p>;
  }
}
export default App;
