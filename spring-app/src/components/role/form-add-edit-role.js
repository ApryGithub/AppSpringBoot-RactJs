import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import RoleDataService from "../../services/role-user";

class AddEditFormRole extends React.Component {
  state = {
    roleId: '',
    roleName: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    let data = {
      roleName: this.state.roleName
    };

    RoleDataService.create(data)
      .then(response => {
        this.setState({
          roleId: response.data.roleId,
          roleName: response.data.roleName
        });
        this.props.addItemToState(response.data)
        this.props.toggle()
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  submitFormEdit = e => {
    e.preventDefault()
    let data = {
      // roleId: this.state.roleId,
      roleName: this.state.roleName
    };
    RoleDataService.update(
      this.state.roleId,
      data
    )
      .then(response => {
        this.props.updateState(response.data)
        this.props.toggle()
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { roleId, roleName } = this.props.item
      this.setState({ roleId, roleName })
    }
  }

  render() {
    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="roleName">Role Name</Label>
          <Input type="text" name="roleName" id="roleName" onChange={this.onChange} value={this.state.roleName === null ? '' : this.state.roleName} />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}

export default AddEditFormRole
