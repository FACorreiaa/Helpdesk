import React, {
  Component
} from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
export class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    return ( <
      >
      <
      Header / >
      <
      />
    );
  }
}

export default Dashboard;