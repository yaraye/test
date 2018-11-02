import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import Footer from "../../components/Footer";

class Detail extends Component {
  state = {
    member: {}
  };
  // When this component mounts, grab the member with the _id of this.props.match.params.id
  // e.g. localhost:3000/members/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getMember(this.props.match.params.id)
      .then(res => this.setState({ member: res.data }))
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
                {this.state.member.member} 
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>Details</h1>
              <br></br>
              <span>Amount paid :   <strong>{this.state.member.payment}</strong></span>
              <br></br>
              <span>Reason for payment:   <strong>{this.state.member.reason}</strong></span>

              {/* data will be pulled from update form---- the total amount for that person will be display somewhere in the page
              <br></br>
              <span>Amount paid :   <strong>{this.state.member.payment}</strong></span>
              <br></br>
              <span>Reason for payment:   <strong>{this.state.member.reason}</strong></span> */}


              <span>
                {this.state.member.synopsis}
              </span>
            </article>
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

export default Detail;
