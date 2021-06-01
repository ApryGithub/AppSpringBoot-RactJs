import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { FaPlus, FaEdit } from "react-icons/fa";
import AddEditFormUser from './form-add-edit-user'

export default class ModalFormUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  render() {
      const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>

      const label = this.props.buttonLabel

      let button = ''
      let title = ''
      let icon = ''

      if(label === 'Edit'){
        icon = <FaEdit/>
        button = <Button
                  color="warning"
                  size="sm"
                  style={{float: "left"}}
                  onClick={this.toggle}>{icon} {label}
                </Button>
        title = 'Edit User'
      } else {
        icon = <FaPlus/>
        button = <Button
                  color="success"
                  size="sm"
                  style={{float: "right"}}
                  onClick={this.toggle}>{icon} {label}
                </Button>
        title = 'Add New User'
      }


      return (
      <div>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
          <ModalBody>
            <AddEditFormUser
              addItemToState={this.props.addItemToState}
              updateState={this.props.updateState}
              toggle={this.toggle}
              item={this.props.item} />
          </ModalBody>
        </Modal>
      </div>
    )
  }
}
