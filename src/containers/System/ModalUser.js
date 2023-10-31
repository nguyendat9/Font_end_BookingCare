import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { emitter } from '../../utils/emitter';

class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: ''
        }
        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: ''
            })
        })
    }


    componentDidMount() {

    }

    toggle = () => {
        this.props.toggleFromParent();
    }

    handleOnChageInput = (event, id) => {
        //bad code 


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
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber'];

        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing params:' + arrInput[i]);
                break;
            }

        }
        return true;
    }


    handleAddNewUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            //call api 
            this.props.createNewUser(this.state);

        }

    }

    render() {

        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size='lg'
                centered>
                <ModalHeader toggle={() => { this.toggle() }}>Create new User</ModalHeader>
                <ModalBody>

                    <div className='modal-user-body'>

                        <div className='input-container'>
                            <label>Email</label>
                            <input type='email' onChange={(event) => { this.handleOnChageInput(event, "email") }} value={this.state.email} />
                        </div>
                        <div className='input-container'>
                            <label>PassWord</label>
                            <input type='password' onChange={(event) => { this.handleOnChageInput(event, "password") }} value={this.state.password} />
                        </div>
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
                    <Button color="primary" className='px-3' onClick={() => { this.handleAddNewUser() }}>Add New</Button>{' '}
                    <Button color="Secondary" className='px-3' onClick={() => { this.toggle() }
                    }> Cancel</Button >
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
