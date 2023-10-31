import React, { Component } from 'react';

import { connect } from 'react-redux';
import './userManage.scss';
import { getAllUser, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import { emitter } from "../../utils/emitter";
import ModalEditUser from './ModalEditUser';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUser: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUserFromReact();

    }

    getAllUserFromReact = async () => {
        let response = await getAllUser('ALL');

        if (response && response.errCode === 0) {
            this.setState({
                arrUser: response.user
            })
        }
    }
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }
    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }
    toggleUserEditModal = () => {
        this.setState({

            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalUser: false
                })
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }

        } catch (e) {
            console.log(e)
        }
    }

    handleDeleteUser = async (user) => {

        try {
            let res = await deleteUserService(user.id);
            if (res && res.errCode === 0) {
                await this.getAllUserFromReact();
            } else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e)

        }
    }

    handleEditUser = (user) => {

        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    doEditUser = async (user) => {
        try {
            let res = await editUserService(user);
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false
                })
                this.getAllUserFromReact()
            } else {
                alert(res.errCode)
            }

        } catch (e) {
            console.log(e)
        }
    }

    render() {

        let arrUser = this.state.arrUser;
        return (
            <div className="users-container" >
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {
                    this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        EditUser={this.doEditUser}
                    />
                }
                <div className='title text-center' > Manage users</div >
                <div className='mx-1' >
                    <button className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewUser()
                        }> <i className="far fa-plus-square" ></i > Add new User</button >

                </div >
                <div className='users-table mt-3 mx-2' >
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Address</th>
                                <th>Action</th>
                            </tr>

                            {arrUser && arrUser.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit' onClick={() => { this.handleEditUser(item) }}><i className="fas fa-user-edit"></i></button>
                                            <button className='btn-delete' onClick={() => { this.handleDeleteUser(item) }} > <i className="fas fa-trash" ></i></button>
                                        </td >
                                    </tr >
                                )
                            })
                            }
                        </tbody >


                    </table >
                </div >
            </div >
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
