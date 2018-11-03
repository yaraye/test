import React from 'react';
import Modal from 'react-modal';
import { Col,} from "../Grid";
import {Input, TextArea, FormBtn } from "../Form";
import {Button } from 'react-bootstrap';
import Members from '../../pages/Members';

 
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
 
  render() {
    return (
      <div>
        <Button onClick={this.openModal}>Update Members</Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          <h2 ref={subtitle => this.subtitle = subtitle}>Member Update Form</h2>
          <h2>{this.props.member_id}</h2>
         
          <Col size="md-6" >
            <form className= "modalForm">
               {/* <Input
                 value={this.props.member}
               onChange={this.props.handleInputChange}
               name="member"
                 placeholder="member (required)"
               />  */}
              <Input
                value={this.props.payment}
                onChange={this.props.handleInputChange}
                name="payment"
                placeholder="payment (required)"
              />
               <Input
                value={this.props.reason}
                onChange={this.props.handleInputChange}
                name="reason"
                placeholder="reason (required)"
              />
              
      {/* note-self(here the text area will pull name from login and auto populate) */}
              <TextArea
                value={this.props.description}
                onChange={this.props.handleInputChange}
                name="description"
                placeholder="description (Optional)"
              />
              <FormBtn
                onClick={this.props.handleFormSubmit}
              >
                Update
              </FormBtn>
            </form>
          </Col>
        </Modal>
      </div>
    );
  }
}
 
