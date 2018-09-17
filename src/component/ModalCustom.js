import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
export default class ModalCustom extends Component {
    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
                <ModalHeader toggle={this.props.toggle}>{this.props.titles}</ModalHeader>
                <ModalBody>
                    {this.props.children}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={this.props.toggle}>Close</Button>
                </ModalFooter>
            </Modal>
        )
    }
}
