import React from "react";
import {
  MDBMask,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
  MDBView,
  MDBContainer
} from "mdbreact";
import "../css/classicformpage.css";

class Home extends React.Component {
  state = {
    collapseID: "",
  };
  
  render() {
    return (
      <div id="classicformpage">
        <MDBView>
          {/* <MDBBox
            display="flex"
            justifyContent="center"
            className="h-auto d-inline-block mt-4"
          >
            <p id="titleES">Hackatona de Engenharia de Software</p>
          </MDBBox> */}
          <MDBMask className="d-flex justify-content-center gradient">
            <MDBContainer className="px-md-3 px-sm-0 mt-5">
              <MDBRow>
                <MDBCol sm="12" md="6" className="mb-4 white-text text-center mt-5">
                  <MDBBtn rounded color="light-blue" >
                    <MDBIcon far size="2x" icon="user-circle" className="mb-2" />
                    <br></br>
                    <a className="black-text links" href="/login">Participante</a>
                  </MDBBtn>
                </MDBCol>
                <MDBCol sm="12" md="6" className="mb-4 white-text text-center mt-5">
                  <MDBBtn >
                    <MDBIcon far size="2x" icon="thumbs-up" className="mb-2" />
                    <br></br>
                    <a className="black-text links" href="/login">Avaliador</a>
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBMask>
        </MDBView>
      </div>
    );
  }
}

export default Home;