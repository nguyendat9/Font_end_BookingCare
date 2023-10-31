import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss';
import TableManagerUser from '../Admin/TableManagerUser';






class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgURL: '',




            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            positionId: '',
            roles: '',
            avatar: '',

            userEditId: '',
            action: ''

        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionrStart();
        this.props.getRoleStart();

        //cu phap chuan cua redux
        // this.props.dispatch(actions.fetchGenderStart());


        // try {
        //     let res = await getAllCodeService('gender');
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data,
        //         })

        //     }
        // } catch (e) {
        //     console.log(e)
        // }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {

            let arrRole = this.props.roleRedux

            this.setState({
                roleArr: arrRole,
                roles: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {

            let arrPosition = this.props.positionRedux
            this.setState({
                positionArr: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : ''
            })
        }

        if (prevProps.listUsers !== this.props.listUsers) {
            let arrRole = this.props.roleRedux
            let arrGenders = this.props.genderRedux
            let arrPosition = this.props.positionRedux
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                roles: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
                positionId: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE,
                previewImgURL: ''
            })
        }
    }

    handleOnChaneImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objURL = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objURL,
                avatar: base64
            })
        }


    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        let { action } = this.state;

        if (action === CRUD_ACTIONS.CREATE) {

            // fire redux create user
            this.props.createNewUser({

                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                roles: this.state.roles,
                positionId: this.state.positionId,
                phoneNumber: this.state.phoneNumber,
                avatar: this.state.avatar
            })
        }

        if (action === CRUD_ACTIONS.EDIT) {



            // fire redux EDIT user
            this.props.editUserRudux({

                id: this.state.userEditId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                gender: this.state.gender,
                roles: this.state.roles,
                positionId: this.state.positionId,
                phoneNumber: this.state.phoneNumber,
                avatar: this.state.avatar
            })
        }



    }
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('Missing required:' + arrCheck[i])
                break;
            }
        }
        return isValid;
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleEditUserFromParent = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }

        this.setState({
            userEditId: user.id,
            email: user.email,
            password: 'HARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            roles: user.roles,
            positionId: user.positionId,
            avatar: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,


        }, () => {
            console.log('check: ', user)
        })
    }

    render() {


        let genders = this.state.genderArr;
        let isGetGender = this.props.isLoadingGender;
        let roleId = this.state.roleArr;
        let position = this.state.positionArr;

        let { email, password, firstName, lastName, phoneNumber, address, gender, positionId, roles, avatar } = this.state;

        return (

            <div className='user-redux-container'>
                <div className="title" >User Redux</div >
                <div className='user-redux-body'>
                    <div className='container'>

                        <div className='row'>
                            <div className='col-12'>{isGetGender === true ? 'LOADING Genders' : ''}</div>

                            <div className='col-12'>Create new User</div>
                            <div className='col-3'>
                                <label>Email</label>
                                <input className="form-control" type="email"
                                    value={email} onChange={(event) => { this.onChangeInput(event, 'email') }} disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false} />
                            </div>
                            <div className='col-3'>
                                <label>Password</label>
                                <input className="form-control" type="password"
                                    value={password} onChange={(event) => { this.onChangeInput(event, 'password') }} disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false} />
                            </div>
                            <div className='col-3'>
                                <label>FirstName</label>
                                <input className="form-control" type="text"
                                    value={firstName} onChange={(event) => { this.onChangeInput(event, 'firstName') }} />
                            </div>
                            <div className='col-3'>
                                <label>LastName</label>
                                <input className="form-control" type="text"
                                    value={lastName} onChange={(event) => { this.onChangeInput(event, 'lastName') }} />
                            </div>
                            <div className='col-3'>
                                <label>PhoneNumber</label>
                                <input className="form-control" type="text"
                                    value={phoneNumber} onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }} />
                            </div>
                            <div className='col-9'>
                                <label>Address</label>
                                <input className="form-control" type="text"
                                    value={address} onChange={(event) => { this.onChangeInput(event, 'address') }} />
                            </div>
                            <div className='col-3'>
                                <label>Gender</label>
                                <select className='form-control'
                                    value={gender} onChange={(event) => { this.onChangeInput(event, 'gender') }}>
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option keyMap={index} value={item.keyMap}>{item.value_Vi} </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>Possition</label>
                                <select className='form-control'
                                    value={positionId} onChange={(event) => { this.onChangeInput(event, 'positionId') }}>
                                    {position && position.length > 0 && position.map((item, index) => {
                                        return (
                                            <option keyMap={index} value={item.keyMap}>{item.value_Vi}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label>RoleId</label>
                                <select className='form-control'
                                    value={roles} onChange={(event) => { this.onChangeInput(event, 'roles') }}>
                                    {roleId && roleId.length > 0 && roleId.map((item, index) => {
                                        return (
                                            <option keyMap={index} value={item.keyMap}>{item.value_Vi}</option>
                                        );
                                    })}

                                </select>
                            </div>
                            <div className='col-3'>
                                <label>Image</label>
                                <div className='preview-img-container'>
                                    <input id='previewIMG' type='file' hidden onChange={(event) => this.handleOnChaneImage(event)} />
                                    <label className='label-upload' htmlFor='previewIMG' >Tải Ảnh  <i className='fas fa-upload'></i></label>
                                    <div className='preview-image' style={{ backgroundImage: `url(${this.state.previewImgURL})` }}>

                                    </div>
                                </div>

                            </div>
                            <div className='col-12 my-3'>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                    onClick={() => this.handleSaveUser()}>Save</button>
                            </div>

                            <div className='col-12 mb-5'>
                                <TableManagerUser
                                    handleEditUserFromParent={this.handleEditUserFromParent}
                                    action={this.state.action}
                                />
                            </div>

                        </div>
                    </div>
                </div>



            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        genderRedux: state.admin.gender,
        isLoadingGender: state.admin.isLoadingGender,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        listUsers: state.admin.users

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionrStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        editUserRudux: (data) => dispatch(actions.editUser(data))
        // processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
