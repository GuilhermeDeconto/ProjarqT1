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
    <CardDeck className="my-2">
      {data
        ? data.map((item, index) => {
            i++;
            return (
              <MDBCol className="mx-auto px-auto my-auto py-auto" key={index}>
                <Card
                  border="warning"
                  key={index}
                  style={{ width: "32vh", backgroundColor: "#003300", color: "white" }}
                  className="my-3"
                >
                  <Card.Img variant="top" style={{ width: 100}} className="align-self-center" src="https://ps.w.org/wp-user-avatar/assets/icon-128x128.png" alt="Sem imagem"/>
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text style={{color: "white"}}>
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
