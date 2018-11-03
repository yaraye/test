import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import UpdateBtn from "../../components/UpdateBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import {Select, Input, TextArea, FormBtn } from "../../components/Form";
import "./Members.css";
import Dropdown from '../../components/Dropdown';
// import Timestamp from 'react-timestamp';
import Footer from '../../components/Footer';




class Members extends Component {

  state = {
    members: [],
    member:"",
    payment: "",
    reason:"",
    description: "",
    id:""
  };


  componentDidMount() {
    this.loadMembers();
  }

  loadMembers = () => {
    API.getMembers()
      .then(res =>
        this.setState({ members: res.data, member: "", payment: "",reason: "", description: "" })
      )
      .catch(err => console.log(err));
  };

  deleteMember = id => {
    API.deleteMember(id)
      .then(res => this.loadMembers())
      .catch(err => console.log(err));
  };

  updateMember = id => {
    console.log(id);
    // API.updateMember(id)
    //   .then(res => this.loadMembers())
    //   .catch(err => console.log(err));
  };
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };
  handleUpdate = event => {
    console.log(event);
    this.setState({
      id: event
    });
  };
  handleFormSubmit = event => {
    event.preventDefault();
    console.log('here')
    if (this.state.member && this.state.payment) {
      API.saveMember({
        member: this.state.member,
        payment: this.state.payment,
        reason: this.state.reason,
        description: this.state.description
      })
        .then(res => this.loadMembers())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <div>
      <Container fluid>
        <Row>
          <Col size="md-6" >
            <Jumbotron>
              <h1>Members Login Form</h1>
            </Jumbotron>
            <form>
            {/* <Timestamp time={member.created_at} /> */}
              <Input
                value={this.state.member}
                onChange={this.handleInputChange}
                name="member"
                placeholder="member (required)"
              />
              <Input
                value={this.state.payment}
                onChange={this.handleInputChange}
                name="payment"
                placeholder="payment (required)"
              />
               <Input
                value={this.state.reason}
                onChange={this.handleInputChange}
                name="reason"
                placeholder="reason (required)"
              />
              {/* <Select 
              value ={this.state.reason}
              onChange={this.handleInputChange}
              name='status'>
                <option defaultValue>
                Choose...
                </option>
                <option
                value ={this.state.reason}
                onChange={this.handleInputChange}>
                Member Fee
                </option>
                <option 
                value ={this.state.reason}
                onChange={this.handleInputChange}>
                Donation</option> 
               </Select>   */}
               {/* <Dropdown  */}
                {/* value={this.props.reason}
                onChange={this.handleInputChange} /> */}
      
              <TextArea
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder="description (Optional)"
              />
              <FormBtn
                disabled={!(this.state.payment && this.state.member)}
                onClick={this.handleFormSubmit}
              >
                Submit 
              </FormBtn>
              
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Members</h1>
            </Jumbotron>
            {this.state.members.length ? (
              <List>
                {this.state.members.map(member => (
                  <ListItem key={member._id}>
                    <Link to={"/members/" + member._id}>
                      <strong>
                        {member.member}
                      </strong>
                    </Link>
                    
                    <DeleteBtn onClick={() => this.deleteMember(member._id)} />
                    
                    <UpdateBtn onClick={() => this.updateMember(member._id)}  />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Member(s) to Display</h3>
            )}
          </Col>
      
        </Row>
      </Container>
        <Footer/>
        </div>
     
    );
  }
}

export default Members;
