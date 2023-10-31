import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { USER_ROLE } from '../../utils/constant';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }
    componentDidMount() {
        let { userInfo } = this.props;
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId;
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu;

            }
            if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu;

            }
        }
        this.setState({
            menuApp: menu
        })
    }
    render() {
        const { processLogout, userInfo } = this.props;


        return (
            <div className="header-container" >
                {/* thanh navigator */}
                < div className="header-tabs-container" >
                    <Navigator menus={doctorMenu} />
                </div >

                {/* nút logout */}
                < div className="btn btn-logout" onClick={processLogout} title='Logout'>

                    <span className='welcome'>Xin chào, {userInfo && userInfo.firstName ? userInfo.firstName : ''} !</span>

                    <i className="fas fa-sign-out-alt" ></i >
                </div >
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
