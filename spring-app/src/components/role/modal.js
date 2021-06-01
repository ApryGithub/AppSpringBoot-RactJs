import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { FaPlus, FaEdit } from "react-icons/fa";
import AddEditFormRole from './form-add-edit-role'

class ModalFormRole extends Component {
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
                  onClick={this.toggle}
                  style={{float: "left", marginRight:"10px"}}>{icon} {label}
                </Button>
        title = 'Edit Role'
      } else {
        icon = <FaPlus/>
        button = <Button
                  color="success"
                  size="sm"
                  onClick={this.toggle}
                  style={{float: "right"}}>{icon} {label}
                </Button>
        title = 'Add New Role'
      }


      return (
      <div>
        {button}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>{title}</ModalHeader>
          <ModalBody>
            <AddEditFormRole
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

export default ModalFormRole
