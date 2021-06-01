import React, { Component } from "react";
import { Table, Button } from 'reactstrap';
import { FaTrash } from "react-icons/fa";
// import Pagination from "@material-ui/lab/Pagination";
import UserDataService from "../../services/user";
import ModalFormButton from './modal'

export default class DataUser extends Component {

  constructor(props) {
    super(props);
    this.onChangeSearchUserName = this.onChangeSearchUserName.bind(this);
    this.retrieveUser = this.retrieveUser.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);
    this.searchUserName = this.searchUserName.bind(this);
    // this.handlePageChange = this.handlePageChange.bind(this);
    // this.handlePageSizeChange = this.handlePageSizeChange.bind(this);

    this.state = {
      userData: [],
      currentUser: null,
      currentIndex: -1,
      searchUserName: "",
      // page: 1,
      // count: 0,
      // pageSize: 1,
    };

    // this.pageSizes = [3, 6, 9];
  }

  componentDidMount() {
    this.retrieveUser();
  }

  onChangeSearchUserName(e) {
    const searchUserName = e.target.value;

    this.setState({
      searchUserName: searchUserName
    });
  }

  // getRequestParams(searchUserName, page, pageSize) {
  //   let params = {};
  //
  //   if (searchUserName) {
  //     params["userName"] = searchUserName;
  //   }
  //
  //   if (page) {
  //     params["page"] = page - 1;
  //   }
  //
  //   if (pageSize) {
  //     params["size"] = pageSize;
  //   }
  //
  //   return params;
  // }

  retrieveUser() {
    UserDataService.getAll()
      .then(response => {
        this.setState({
          userData: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  // retrieveUser() {
  //   const { searchUserName, page, pageSize } = this.state;
  //   const params = this.getRequestParams(searchUserName, page, pageSize);
  //
  //   UserDataService.getAll(params)
  //     .then((response) => {
  //       const { userData, totalPages } = response.data;
  //
  //       this.setState({
  //         userData: userData,
  //         count: totalPages,
  //       });
  //       console.log(response.data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }

  handlePageChange(event, value) {
    this.setState(
      {
        page: value,
      },
      () => {
        this.retrieveUser();
      }
    );
  }

  handlePageSizeChange(event) {
    this.setState(
      {
        pageSize: event.target.value,
        page: 1
      },
      () => {
        this.retrieveUser();
      }
    );
  }


  refreshList() {
    this.retrieveUser();
    this.setState({
      currentUser: null,
      currentIndex: -1
    });
  }

  setActiveUser(user, index) {
    this.setState({
      currentUser: user,
      currentIndex: index
    });
  }

  searchUserName() {
    this.setState({
      currentUser: null,
      currentIndex: -1
    });

    UserDataService.findByUserName(this.state.searchUserName)
      .then(response => {
        this.setState({
          userData: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteItem = (id, name) => {
    let confirmDelete = window.confirm(`Delete User Name ${name}?`)
    if(confirmDelete){
      // console.log("Delete "+ id);
      UserDataService.delete(id)
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

    const { searchUserName, userData } = this.state;
    // const { searchUserName, page, count, pageSize } = this.state;
    let no = 1;
    let thisStateUserData = '';
    if(this.state.userData !== null){
      thisStateUserData = userData;
    }else{
      thisStateUserData = this.props.userData;
    }
    const tableBody = thisStateUserData.map(item => {
      return (
        <tr key={item.userId}>
          <td style={{width:"10px"}}>{no++}</td>
          <th>{item.userName}</th>
          <td>{item.userGenre}</td>
          <td>{item.userBirthday}</td>
          <td>{item.userAddress}</td>
          <td>{item.userEmail}</td>
          <td>{item.userRoleId.roleName}</td>
          <td style={{textAlign: 'center'}}>
            <div style={{width:"200px"}}>
            <ModalFormButton buttonLabel="Edit" item={item} updateState={this.props.updateState}/>

            <Button color="danger" size="sm" onClick={() => this.deleteItem(item.userId, item.userName)}><FaTrash/> Delete</Button>
            </div>
          </td>
        </tr>
        )
      })

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by User Name"
              value={searchUserName}
              onChange={this.onChangeSearchUserName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchUserName}
                // onClick={this.retrieveUser}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* <div className="mt-3">
            {"Items per Page: "}
            <select onChange={this.handlePageSizeChange} value={pageSize}>
              {this.pageSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            <Pagination
              className="my-3"
              count={count}
              page={page}
              siblingCount={1}
              boundaryCount={1}
              variant="outlined"
              shape="rounded"
              onChange={this.handlePageChange}
            />
          </div> */}

        <Table responsive hover bordered>
          <thead>
            <tr>
              <th style={{textAlign: 'center'}}>No</th>
              <th>User Name</th>
              <th>User Genre</th>
              <th>User Birthday</th>
              <th>User Address</th>
              <th>User Email</th>
              <th>User Role</th>
              <th style={{textAlign: 'center'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableBody}
          </tbody>
        </Table>
      </div>
    );
  }
}
