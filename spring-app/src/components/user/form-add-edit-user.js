import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import UserDataService from "../../services/user";
import RoleDataService from "../../services/role-user";

export default class AddEditFormUser extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     modal: false
  //   }
    state = {
      userId: '',
      userName: '',
      userGenre: '',
      userBirthday: '',
      userAddress: '',
      userEmail: '',
      userRoleId: '',
      // userRoleId: {
      //   roleId: '',
      //   roleName: ''
      // },
      roleData: [],
    }
  // }

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

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    let data = {
      userName: this.state.userName,
      userGenre: this.state.userGenre,
      userBirthday: this.state.userBirthday,
      userAddress: this.state.userAddress,
      userEmail: this.state.userEmail,
      userRoleId: this.state.userRoleId,
      // userRoleId: {
      //   roleId: this.state.userRoleId.roleId,
      //   roleName: this.state.userRoleId.roleName
      // },
    };

    UserDataService.create(data)
      .then(response => {
        this.setState({
          userId: response.data.userId,
          userName: response.data.userName,
          userGenre: this.state.userGenre,
          userBirthday: this.state.userBirthday,
          userAddress: this.state.userAddress,
          userEmail: this.state.userEmail,
          userRoleId: this.state.userRoleId,
          // userRoleId: {
          //   roleId: this.state.userRoleId.roleId,
          //   roleName: this.state.userRoleId.roleName
          // },
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
      // userId: this.state.userId,
      userName: this.state.userName,
      userGenre: this.state.userGenre,
      userBirthday: this.state.userBirthday,
      userAddress: this.state.userAddress,
      userEmail: this.state.userEmail,
      userRoleId: this.state.userRoleId,
      // userRoleId: {
      //   roleId: this.state.userRoleId.roleId,
      //   roleName: this.state.userRoleId.roleName
      // },
    };
    UserDataService.update(
      this.state.userId,
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
      const { userId, userName, userGenre, userBirthday, userAddress, userEmail, userRoleId } = this.props.item
      this.setState({ userId, userName, userGenre, userBirthday, userAddress, userEmail, userRoleId })
    }
    this.retrieveRole();
  }

  render() {

    const options = this.state.roleData.map(option => {
      return (
        <option key={option.roleId} value={option.roleId}>{option.roleName}</option>
      )
    })

    return (
      <Form onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}>
        <FormGroup>
          <Label for="userName">User Name</Label>
          <Input type="text" name="userName" id="userName" onChange={this.onChange} value={this.state.userName === null ? '' : this.state.userName} />
        </FormGroup>

        {/* <FormGroup check>
          <Label for="userGenre">User Genre</Label>
          <Input type="text" name="userGenre" id="userGenre" onChange={this.onChange} value={this.state.userGenre === null ? '' : this.state.userGenre} />
        </FormGroup> */}

        <FormGroup tag="fieldset">
          <Label for="userGenre">User Genre</Label>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="userGenre" onChange={this.onChange} value="male" checked={this.state.userGenre === 'male'}/>{' '}Male
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio" name="userGenre" onChange={this.onChange} value="female" checked={this.state.userGenre === 'female'}/>{' '}Female
            </Label>
          </FormGroup>
        </FormGroup>

        <FormGroup>
          <Label for="userBirthday">User Birthday</Label>
          <Input type="date" name="userBirthday" id="userBirthday" onChange={this.onChange} value={this.state.userBirthday === null ? '' : this.state.userBirthday} />
        </FormGroup>
        <FormGroup>
          <Label for="userAddress">User Address</Label>
          <Input type="textarea" name="userAddress" id="userAddress" onChange={this.onChange} value={this.state.userAddress === null ? '' : this.state.userAddress} />
        </FormGroup>
        <FormGroup>
          <Label for="userEmail">User Email</Label>
          <Input type="email" name="userEmail" id="userEmail" onChange={this.onChange} value={this.state.userEmail === null ? '' : this.state.userEmail} />
        </FormGroup>
        <FormGroup>
          {/* <Label for="userRoleId">User Role</Label>
          <Input type="text" name="userRoleId" id="userRoleId" onChange={this.onChange} value={this.state.userRoleId === null ? '' : this.state.userRoleId.roleName} /> */}
          <select style={{width: '100%'}} name="userRoleId" value={this.state.userRoleId.roleId} onChange={this.onChange}>
            {options}
          </select>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}
