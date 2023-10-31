import React, { Component } from 'react';
import { connect } from 'react-redux';
import './About.scss';


class About extends Component {



    render() {


        return (
            <div className='section-share section-about'>

                <div className='section-about-content'>
                    <div className=' content-left'>
                        <a href='/'>
                            <div className='footer-logo'></div>
                        </a>
                        <div className='text-name'>
                            <h2>Công ty Cổ phần Công nghệ BookingCare</h2>


                            <p><i className="fa fa-map-marker" aria-hidden="true"></i>Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam</p>

                            <p><i className="fa fa-check" aria-hidden="true"></i>ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015.</p>

                        </div>

                        <div className='title-address'>
                            <div className='img-check'></div>
                            <div className='text-address'>
                                <p><b>Văn phòng tại TP Hồ Chí Minh</b> </p>
                                <p>Số 01, Hồ Bá Kiện, Phường 15, Quận 10</p>

                            </div>
                        </div>

                        <div className='support'>
                            <p><b>Hỗ trợ khách hàng</b></p>
                            <p>support@bookingcare.vn (7h30 - 18h)</p>
                        </div>


                        <div className='hotline'>
                            <p><b>Hotline</b></p>
                            <p><span style={{ color: '#45c3d2' }}>024-7301-2468</span> (7h30 - 18h)</p>
                        </div>

                    </div>
                    <div className=' content-middle'>
                        <ul >
                            <li> Liên hệ hợp tác </li>
                            <li> Danh bạ y tế </li>
                            <li> Sức khỏe doanh nghiệp </li>
                            <li> Gói chuyển đổi số doanh nghiệp </li>
                            <li> Tuyển dụng </li>
                            <li> Câu hỏi thường gặp </li>
                            <li> Điều khoản sử dụng </li>
                            <li> Chính sách Bảo mật </li>
                            <li> Quy trình hỗ trợ giải quyết khiếu nại </li>
                            <li> Quy chế hoạt động </li>
                        </ul>

                    </div>
                    <div className=' content-right'>

                        <div className='title-intro'>
                            <div className='title-partner'><b>Đối tác bảo trợ nội dung</b></div>


                            <div className='partner'>
                                <div className='name-partner-1'>
                                    <p> <a href='https://hellodoctors.vn/' target='_blank'>Hello Doctor</a></p>
                                    <p><span>Bảo trợ chuyên mục nội dung “sức khỏe tinh thần”.</span></p>
                                </div>

                                <div className='name-partner-2'>
                                    <p><a href='https://bernard.vn/' target='_blank'>Hệ thống y khoa chuyên sâu quốc tế Bernard</a></p>
                                    <span> Bảo trợ chuyên mục nội dung “y khoa chuyên sâu”.</span>
                                </div>
                            </div>

                        </div>


                    </div>
                </div>

            </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(About);
