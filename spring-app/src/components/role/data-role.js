import React, { Component } from "react";
import { Table, Button } from 'reactstrap';
import { FaTrash } from "react-icons/fa";
import RoleDataService from "../../services/role-user";
import ModalFormButton from './modal'

export default class DataRole extends Component {

  deleteItem = (id, name) => {
    let confirmDelete = window.confirm(`Delete Role Name ${name}?`)
    if(confirmDelete){
      // console.log("Delete "+ id);
      RoleDataService.delete(id)
        .then(response => {
          console.log(response.data);
          this.props.deleteItemFromState(id)
        })
        .catch(e => {
          console.log(e);
        });
    }

  }

  render() {

    let no = 1;

    const tableBody = this.props.roleData.map(item => {
      return (
        <tr key={item.roleId}>
          <td style={{width:"10px"}}>{no++}</td>
          {/* <th scope="row">{item.roleId}</th> */}
          <th>{item.roleName}</th>
          <td>
          <div>
            <ModalFormButton buttonLabel="Edit" item={item} updateState={this.props.updateState}/>
            {' '}
            <Button color="danger" size="sm" onClick={() => this.deleteItem(item.roleId, item.roleName)}><FaTrash/> Delete</Button>
          </div>
          </td>
        </tr>
        )
      })

    return (

      <Table responsive hover bordered>
        <thead>
          <tr>
            <th style={{textAlign: 'center'}}>No</th>
            {/* <th>Role ID</th> */}
            <th>Role Name</th>
            <th style={{width: "200px", textAlign: 'center'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableBody}
        </tbody>
      </Table>

    );
  }
}
