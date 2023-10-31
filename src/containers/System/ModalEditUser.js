import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';

class ModalEditUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            // password:'',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: ''
        }

    }


    componentDidMount() {

        let user = this.props.currentUser
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                // password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phoneNumber: user.phoneNumber
            })
        }
    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChageInput = (event, id) => {
        //good code
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }
    // validate check xem du lieu dung hay sai
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'firstName', 'lastName', 'address', 'phoneNumber'];

        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing params:' + arrInput[i]);
                break;
            }

        }
        return true;
    }


    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            //call api edit uesr
            this.props.EditUser(this.state);
        }

    }

    render() {

        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size='lg'
                centered>
                <ModalHeader toggle={() => { this.toggle() }}>Edit User</ModalHeader>
                <ModalBody>

                    <div className='modal-user-body'>

                        <div className='input-container'>
                            <label>Email</label>
                            <input type='email' onChange={(event) => { this.handleOnChageInput(event, "email") }} value={this.state.email} disabled />
                        </div>
                        {/* <div className='input-container'>
                            <label>PassWord</label>
                            <input type='password' onChange={(event) => { this.handleOnChageInput(event, "password") }} value={this.state.password} />
                        </div> */}
                        <div className='input-container' >
                            <label>FirstName</label>
                            <input type='text' onChange={(event) => { this.handleOnChageInput(event, "firstName") }} value={this.state.firstName} />
                        </div >
                        <div className='input-container' >
                            <label>LastName</label>
                            <input type='text' onChange={(event) => { this.handleOnChageInput(event, "lastName") }} value={this.state.lastName}
                            />
                        </div >
                        <div className='input-container max-width-input' >
                            <label>Address</label>
                            <input type='text' onChange={(event) => { this.handleOnChageInput(event, "address") }} value={this.state.address} />
                        </div >
                        <div className='input-container' >
                            <label>PhoneNumber</label>
                            <input type='text' onChange={(event) => { this.handleOnChageInput(event, "phoneNumber") }} value={this.state.phoneNumber} />
                        </div >

                    </div >

                </ModalBody >
                <ModalFooter>
                    <Button color="primary" className='px-3' onClick={() => { this.handleSaveUser() }}>Save</Button>{' '}
                    <Button color="Secondary" className='px-3' onClick={() => { this.toggle() }}> Cancel</Button >
                </ModalFooter >
            </Modal >
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
