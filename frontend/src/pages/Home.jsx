import React from "react";
import {
  MDBMask,
  MDBRow,
  MDBCol,
  MDBView,
  MDBContainer,
  MDBBox,
  MDBBtn,
} from "mdbreact";
import "../css/classicformpage.css";
import '../css/home.css'

class Home extends React.Component {
  state = {
    collapseID: "",
  };

  render() {
    return (
      <div id="classicformpage">
        <MDBView>
          <MDBMask className="d-flex justify-content-center gradient">
            <MDBContainer className="px-md-3 px-sm-0 mt-5">
              <MDBRow>
                <MDBCol
                  sm="12"
                  md="12"
                  xl="12"
                  lg="12"
                  className="mb-4 white-text text-center "
                >
                  <MDBBox
                    display="flex"
                    justifyContent="center"
                    className="d-inline-block"
                  >
                    <a  href="/acessar">
                      <MDBBtn id="buttonhome">Acessar</MDBBtn>
                    </a>
                  </MDBBox>
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
