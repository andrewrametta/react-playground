import React, { Component } from "react";

export default class RouletteGun extends Component {
  static defaultProps = {
    bulletInChamber: 8,
  };
  state = {
    chamber: null,
    spinningTheChamber: false,
  };
  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  renderBullet() {
    const { chamber, spinningTheChamber } = this.state;
    const { bulletInChamber } = this.props;
    if (spinningTheChamber) {
      return "spinning the chamber and pulling the trigger!...";
    } else if (chamber === bulletInChamber) {
      return "BANG!!!";
    } else {
      return "you're safe";
    }
  }
  handleButtonClick = () => {
    console.log("boom");
    this.setState({ spinningTheChamber: true });
    this.timeout = setTimeout(() => {
      const randomNumber = Math.ceil(Math.random() * 8);
      this.setState({
        chamber: randomNumber,
        spinningTheChamber: false,
      });
    }, 2000);
  };
  render() {
    return (
      <div className="RouletteGun">
        <p>{this.renderBullet()}</p>
        <button onClick={this.handleButtonClick}>Pull the trigger!</button>
      </div>
    );
  }
}
