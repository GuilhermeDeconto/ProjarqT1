import React from "react";
import { CardDeck, Card } from "react-bootstrap";

import { MDBCol } from "mdbreact";

// eslint-disable-next-line
const images = ["", "", "", "", ""];
// eslint-disable-next-line
var i = 0;
const CardParticipant = (props) => {
  var { data } = props;
  return (
    <CardDeck className="my-2 mt-3">
      {data
        ? data.map((item, index) => {
            i++;
            return (
              <MDBCol key={index}>
                <Card
                  border="success"
                  key={index}
                  style={{ width: "32vh", backgroundColor: "#e8e8e8", color: "white" }}
                  className="my-3"
                >
                  <Card.Img variant="top" style={{ width: 100}} className="align-self-center" src="https://ps.w.org/wp-user-avatar/assets/icon-128x128.png" alt="Sem imagem"/>
                  <Card.Body>
                    <Card.Title style={{color: "black"}} >{item.name}</Card.Title>
                    <Card.Text style={{color: "black"}}>
                      <strong>Curso:</strong> <br />{item.curse}
                      <br />
                      <strong>Semestre:</strong> <br />{item.semester}
                      <br />
                      <strong>Email:</strong> <br />{item.email}
                      <br />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </MDBCol>
            );
          })
        : ""}
    </CardDeck>
  );
};

export default CardParticipant;
