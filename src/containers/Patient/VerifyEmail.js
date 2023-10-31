import React, { Component } from 'react';
import { connect } from "react-redux";
import { postVerifyBookAppointment } from '../../services/userService';
import HeaderHome from '../HomePage/HeaderHome';
import './VerifyEmail.scss';

class VerifyEmail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            starusVerify: false,
            errCode: 0
        }
    }

    async componentDidMount() {

        if (this.props.location && this.props.location.search) {
            let urlParams = new URLSearchParams(this.props.location.search);
            let token = urlParams.get('token');
            let doctorId = urlParams.get('doctorId');
            let res = await postVerifyBookAppointment({
                token: token,
                doctorId: doctorId
            })
            if (res && res.errCode === 0) {
                this.setState({
                    starusVerify: true,
                    errCode: res.errCode
                })
            } else {
                this.setState({
                    starusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { starusVerify, errCode } = this.state;
        console.log('check state', this.state)

        return (
            <>
                <HeaderHome />

                <div className='verify-booking-container'>
                    {starusVerify === false ?
                        <div>
                            Đang tải dữ liệu...
                        </div>

                        :

                        <div>
                            {+errCode === 0 ?
                                <div className='infor-booking-success'>Xác nhận đặt lịch hẹn thành công!</div> :
                                <div className='infor-booking-fails'>Đặt lịch hẹn thất bại!. <p>Lịch hẹn có thể đã tồn tại hoặc đã được xác nhận.</p></div>
                            }
                        </div>
                    }
                </div>
            </>

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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
