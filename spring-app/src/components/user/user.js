import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';
import UserDataService from "../../services/user";
import DataUser from './data-user'
import ModalFormButton from './modal'

// Component's Base CSS
import '../../App.css';

export default class User extends Component {

  state = {
    userData: [],
  };

  componentDidMount() {
    this.retrieveUser();
  }

  retrieveUser() {
    UserDataService.getAll()
      .then(response => {
        this.setState({
          userData: response.data
        });
        // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  addItemToState = (item) => {
    this.setState(prevState => ({
      userData: [...prevState.userData, item]
    }))
  }

  updateState = (item) => {

    const itemIndex = this.state.userData.findIndex(data => data.userId === item.userId)
    const newArray = [
    // destructure all userData from beginning to the indexed item
      ...this.state.userData.slice(0, itemIndex),
    // add the updated item to the array
      item,
    // add the rest of the userData to the array from the index after the replaced item
      ...this.state.userData.slice(itemIndex + 1)
    ]

    this.setState({ userData: newArray })
  }

  deleteItemFromState = (id) => {
    const updatedItems = this.state.userData.filter(item => item.userId !== id)
    this.setState({ userData: updatedItems })
  }

  render() {

    return (
      <Container>
        <Row>
          <Col>
            <h1 style={{textAlign: 'center'}}>Data User</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <ModalFormButton buttonLabel="Add User" addItemToState={this.addItemToState}/>
          </Col>
        </Row>
        <br />
        <DataUser userData={this.state.userData} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
      </Container>
    );
  }
}
