import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import Footer from "../../components/Footer";
// import { List, ListItem } from "../../components/List";


class Account extends Component {
  // state = {
  //   member: {}
  // };
  // When this component mounts, grab the member with the _id of this.props.match.params.id
  // e.g. localhost:3000/members/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getMember(this.props.member)
      .then(res => this.setState({ members: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                Account Detail of Members
              </h1>
            </Jumbotron>
              <h3>No Member(s) to Display</h3>

          </Col>
        </Row>

        <Row>
          <br></br><br></br>
          <Col size="md-2">
            <Link to="/">← Back to Membership Form</Link>
          </Col>
        </Row>
      </Container>
      <Footer/>
      </div>
    );
  }
}

export default Account;
