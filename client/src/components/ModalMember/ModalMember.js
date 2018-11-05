import React from 'react';
import Modal from 'react-modal';
import { Col,} from "../Grid";
import {Input, TextArea, FormBtn } from "../Form";
import {Button } from 'react-bootstrap';
import styles from './modalMember.css.js';
import API from "../../utils/API";
// import Members from '../../pages/Members';
// <h2>{this.props.itemId}</h2>


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('body');


export default class ModalMember extends React.Component {
  constructor(props) {
    super(props);
    // this.props.func(this);

    this.state = {
      modalIsOpen: false,
      newData: {
        member:"",
        payment: "",
        reason:"",
        description: "",
      }
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  handleInputChange = event => {
    event.persist();

    console.log(event.target.name);
    console.log(this.state.data);

    console.log(event.target.value);
    console.log(this.props.reason);
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  updateMember(e) {
    e.preventDefault();
    console.log(e, this.props.itemId, this.props.member, this.props.payment, this.props.reason, this.props.description)
    API.updateMember(
      {id: this.props.itemId},
      {
      member: this.props.member,
      payment: this.props.payment,
      reason: this.props.reason,
      description: this.props.description
      })
      // .then(res)
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <Button onClick={this.openModal}>Update Members</Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles.content}
          // contentLabel="Example Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Update {this.props.member}s' account</h2>

          <Col size="md-6" >
            <form className= "modalForm" style={{ height: '300px', width: '200px' }}>
               {/* <Input
                 value={this.props.member}
               onChange={this.props.handleInputChange}
               name="member"
                 placeholder="member (required)"
               />  */}
              <Input
                type="number"
                defaultValue={this.props.payment}
                onChange={(e) => {this.handleInputChange(e)}}
                name="payment"
                placeholder="payment (required)"
              />
               <Input
                type="text"
                defaultValue={this.props.reason}
                onChange={(e) => {this.handleInputChange(e)}}
                name="reason"
                placeholder="reason (required)"
              />

      {/* note-self(here the text area will pull name from login and auto populate) */}
              <TextArea
                type="text"
                defaultValue={this.props.description}
                onChange={(e) => {this.handleInputChange(e)}}
                name="description"
                style={{ height: '200px '}}
                placeholder="description (Optional)"
              />
              <FormBtn onClick={(e) => this.updateMember(e)}>Update data</FormBtn>
            </form>
          </Col>
        </Modal>
      </div>
    );
  }
}
