import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import flag from '../../assets/flag_VN.png';
import { withRouter } from 'react-router';


class HeaderHome extends Component {


    returnHome = () => {
        this.props.history.push(`/home`)
    }

    render() {

        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className="fas fa-bars"></i>
                            <div className='header-logo' onClick={() => this.returnHome()}></div>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div><b>Chuyên Khoa</b></div>
                                <div className='sub-title'>Tìm bác sĩ theo chuyên khoa</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Cơ Sở Y Tế</b></div>
                                <div className='sub-title'>Chọn bệnh viên phòng khám</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Bác Sĩ</b></div>
                                <div className='sub-title'>Chọn bác sĩ giỏi</div>
                            </div>
                            <div className='child-content'>
                                <div><b>Gói Khám</b></div>
                                <div className='sub-title'>Khám sức khỏe tổng quát</div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'><i className="fas fa-question-circle"></i>Hỗ trợ</div>
                            <div className='language'>
                                <image className='flag' src={flag} />
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner == true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title1'>
                                NỀN TẢNG Y TẾ
                            </div>
                            <div className='title2'>
                                CHĂM SÓC SỨC KHỎE TOÀN DIỆN
                            </div>
                            <div className='search'>
                                <i classN="fas fa-search"></i>
                                <input type='text' placeholder='Tìm Chuyên Khoa' />
                            </div>
                        </div>
                        <div className='content-down'>
                            <div className='options'>
                                <div className="option-child">
                                    <div className='icon-child'><i className="fas fa-hospital"></i></div>
                                    <div className='text-child'>Khám Chuyên Khoa</div>
                                </div>
                                <div className="option-child">
                                    <div className='icon-child'><i className="fas fa-mobile-alt"></i></div>
                                    <div className='text-child'>Khám Từ Xa</div>
                                </div>
                                <div className="option-child">
                                    <div className='icon-child'><i className="fas fa-stethoscope"></i></div>
                                    <div className='text-child'>Khám Tổng Quát</div>
                                </div>
                                <div className="option-child">
                                    <div className='icon-child'><i className="fas fa-flask"></i></div>
                                    <div className='text-child'>Xét Nghiệm Y Học</div>
                                </div>
                                <div className="option-child">
                                    <div className='icon-child'><i className="fas fa-heartbeat"></i></div>
                                    <div className='text-child'>Sức Khỏe Tinh Thần</div>
                                </div>
                                <div className="option-child">
                                    <div className='icon-child'><i className="fas fa-briefcase-medical"></i></div>
                                    <div className='text-child'>Khám Nha Khoa</div>
                                </div>

                            </div>
                        </div>

                    </div>
                }
            </React.Fragment >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderHome));
