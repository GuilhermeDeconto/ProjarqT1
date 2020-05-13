import React from "react";
import PainelNavBar from '../components/PainelNavBar'
class Participant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<React.Fragment>
      <PainelNavBar title={"Participante"} />
    </React.Fragment>)
  }
}

export default Participant;
