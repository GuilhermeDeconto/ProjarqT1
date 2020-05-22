import React from "react";
import { CardDeck, Card, Image } from "react-bootstrap";
import AvatarUser from '../images/iconUserCard.png';
import Avatar from '@material-ui/core/Avatar';

import { MDBCol } from "mdbreact";

const images = ["", "", "", "", ""];
var index = 0;
const CardParticipant = (props) => {
  var { data } = props;
  return (
    <CardDeck className="my-2">
      {data
        ? data.map((item, index) => {
            index++;
            return (
              <MDBCol className="mx-auto px-auto my-auto py-auto" >
                <Card
                  border="info"
                  key={index}
                  style={{ width: "15rem", backgroundColor: "#DDA0DD", color: "black" }}
                  className="my-3"
                >
                  <Card.Img variant="top" src="https://ps.w.org/wp-user-avatar/assets/icon-256x256.png?rev=1755722" alt="Faltou imagem"/>
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
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
