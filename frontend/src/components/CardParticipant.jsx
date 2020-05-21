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
                  border="primary"
                  key={index}
                  style={{ width: "15rem" }}
                  className="my-2"
                >
                  <Card.Img variant="top" src="https://lh3.googleusercontent.com/proxy/r6BjPSoe_zwtOSaS2T6k3wY36Q808csK32N2wXBJ8vQcNFeP775ZuLZjkfqyqkAsRLxYT04kx031IXNdoHF3bpK5FLORiN4wao3dZdcAdTX7jp49IVP06DIX5WRjlW9OWq_AeR7saAeLns-S3QtNGQ" />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text className="text-muted">
                      Curso: {item.curse}
                      <br />
                      Semestre: {item.semester}
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
