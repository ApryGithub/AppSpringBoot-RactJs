import React, { Component } from "react";
import { Container, Row, Col } from 'reactstrap';
import RoleDataService from "../../services/role-user";
import DataRole from './data-role'
import ModalFormButton from './modal'

// Component's Base CSS
import '../../App.css';

// let RoleData = function() {
//   return RoleDataService.getAll()
// }
// let DataRole = RoleData()
// console.log(DataRole) // Promise { <pending> }
// DataRole.then(result => console.log(result.data))

// let RoleData = RoleDataService.getAll()

// let RoleData = DataRole.then(result => console.log(result.data));

export default class Role extends Component {
  // constructor(props) {
  //   super(props);

    state = {
      roleData: [],
    };
  // }

  componentDidMount() {
    this.retrieveRole();
  }

  retrieveRole() {
    RoleDataService.getAll()
      .then(response => {
        this.setState({
          roleData: response.data
        });
        // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  addItemToState = (item) => {
    this.setState(prevState => ({
      roleData: [...prevState.roleData, item]
    }))
  }

  updateState = (item) => {

    const itemIndex = this.state.roleData.findIndex(data => data.roleId === item.roleId)
    const newArray = [
    // destructure all roleData from beginning to the indexed item
      ...this.state.roleData.slice(0, itemIndex),
    // add the updated item to the array
      item,
    // add the rest of the roleData to the array from the index after the replaced item
      ...this.state.roleData.slice(itemIndex + 1)
    ]

    this.setState({ roleData: newArray })
  }

  deleteItemFromState = (id) => {
    const updatedItems = this.state.roleData.filter(item => item.roleId !== id)
    this.setState({ roleData: updatedItems })
  }

  render() {

    return (
      <Container>
        <Row>
          <Col>
            <h1 style={{textAlign: 'center'}}>Data Role</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <ModalFormButton buttonLabel="Add Role" addItemToState={this.addItemToState}/>
          </Col>
        </Row>
        <br />
        <DataRole roleData={this.state.roleData} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
      </Container>
    );
  }
}
