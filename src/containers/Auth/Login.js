import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import { handleLoginApi } from '../../services/userService';
import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { divide } from 'lodash';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPass: false,
            errMessage: ''
        }

    }

    handleOnChaneUserName = (event) => {
        this.setState(
            {
                username: event.target.value
            }
        )
        // console.log(event.target.value)
    }

    handleOnChanePassWord = (event) => {
        this.setState(
            {
                password: event.target.value
            }
        )
        // console.log(event.target.value)
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password);
            if (data && data.errCode != 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log('login succeeds')
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }


        }

    }

    handleShowPassword = () => {
        this.setState({
            isShowPass: !this.state.isShowPass
        })
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.handleLogin();
        }
    }

    render() {

        return (
            <div className='login-background' >
                <div className='login-container' >
                    <div className='login-content' >
                        <div className='col-12 text-login' > Login</div >
                        <div className='col-12 form-group login-input' >
                            <label>User Name</label>
                            <input type='text' className='form-control' placeholder='Enter your username'
                                value={this.state.username}
                                onChange={(event) => { this.handleOnChaneUserName(event) }
                                } />
                        </div >
                        <div className='col-12 form-group login-input' >
                            <label>PassWord</label>
                            <div className='custom-input-password' >
                                <input type={this.state.isShowPass ? 'text' : 'password'} className='form-control' placeholder='Enter your password'
                                    value={this.state.password}
                                    onChange={(event) => { this.handleOnChanePassWord(event) }}
                                    onKeyDown={(event) => { this.handleKeyDown(event) }} />
                                < span onClick={() => {
                                    this.handleShowPassword()
                                }}>

                                    <i className={this.state.isShowPass ? 'far fa-eye' : 'fas fa-eye-slash'}></i>
                                </span >
                            </div >
                            <div className='col-12' style={{ color: 'red' }}>
                                {this.state.errMessage}
                            </div >
                        </div >
                        <div className='col-12 ' >
                            <button className='btn-login' onClick={() => { this.handleLogin() }}> Login</button >
                        </div >

                        <div className='col-12 mt-3' >
                            <span className='forgot-password' > Quên Mật Khẩu ?</span >
                        </div >
                        <div className='col-12 text-center mt-5' >
                            <span className='text-other-login' > Or Sign Up Using</span >
                        </div >
                        <div className='col-12 social-login ' >
                            <i className="fab fa-google-plus-square google" ></i >
                            <i className="fab fa-twitter twitter" ></i >
                            <i className="fab fa-facebook facebook" ></i >
                        </div >
                    </div >
                </div >
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),

        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
