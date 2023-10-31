import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorExtraInfo.scss';
import { getExtraInforDoctorById } from '../../../services/userService';
import { dateFilter } from 'react-bootstrap-table2-filter';
import NumberFormat from 'react-number-format';

class DoctorExtraInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isShowDetailInfor: false,
            isShowDetaiIsurance: false,

            extraInfor: {},
        }
    }


    async componentDidMount() {
        if (this.props.doctorIdFromParent) {
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
            let res = await getExtraInforDoctorById(this.props.doctorIdFromParent)
            if (res && res.errCode === 0) {
                this.setState({
                    extraInfor: res.data
                })
            }
        }
    }


    showDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }

    showDetailIsurance = (status2) => {
        this.setState({
            isShowDetaiIsurance: status2
        })
    }
    render() {

        let { isShowDetailInfor, isShowDetaiIsurance, extraInfor } = this.state;

        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'>Địa Chỉ Khám</div>
                    <div className='name-clinic'>
                        {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}
                    </div>
                    <div className='detail-address'>
                        {extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}
                    </div>
                </div>

                <div className='content-middle'>

                    {isShowDetailInfor === false &&
                        <div className='short-infor'>
                            GIÁ KHÁM:
                            {extraInfor && extraInfor.priceTypeData && extraInfor.priceTypeData
                                &&
                                <NumberFormat
                                    className='currenty'
                                    value={extraInfor.priceTypeData.value_Vi}
                                    displayType='text'
                                    thousandSeparator={true}
                                    suffix='VND'
                                />

                            }
                            <span className='detail' onClick={() => this.showDetailInfor(true)}>Xem chi tiết</span>
                        </div>
                    }

                    {isShowDetailInfor === true &&

                        <>
                            <div className='detail-infor'>
                                <div className='price1'>
                                    <span className='left'> Giá Khám</span>
                                    <span className='right'>
                                        {extraInfor && extraInfor.priceTypeData && extraInfor.priceTypeData
                                            &&
                                            <NumberFormat
                                                className='currenty'
                                                value={extraInfor.priceTypeData.value_Vi}
                                                displayType='text'
                                                thousandSeparator={true}
                                                suffix='VND'
                                            />

                                        }

                                    </span>


                                    <div className='note'>
                                        {extraInfor && extraInfor.note ? extraInfor.note : ''}
                                    </div>
                                    <div className='note'>
                                        Giá khám cho người nước ngoài 30 USD
                                    </div>
                                </div>

                                <div className='price2'>
                                    <span className='left'>Giá tái khám</span>


                                    <div className='note'>
                                        Theo chỉ định của bác sĩ
                                    </div>
                                </div>

                                <div className='payment'>
                                    Người bệnh có thể thanh toán chi phí bằng hình thức: Tiền mặt hoặc thanh toán qua thẻ ATM

                                    {/* {extraInfor && extraInfor.paymentTypeData ? extraInfor.paymentTypeData.value_Vi : ''} */}
                                </div>


                            </div>

                            <div className='hide-price'>
                                <span onClick={() => this.showDetailInfor(false)}>Ẩn Bảng Giá</span>
                            </div>

                        </>
                    }
                </div>
                <div className='content-down'>
                    {isShowDetaiIsurance === false &&
                        <div className='text-insurance'>
                            LOẠI BẢO HIỂM ÁP DỤNG. <span onClick={() => this.showDetailIsurance(true)}>Xem chi tiết</span>
                        </div>

                    }

                    {isShowDetaiIsurance === true &&
                        <>
                            <div className='up'>
                                <div> Bảo hiểm Y tế nhà nước </div>
                                <div className='text-small1'>Có áp dụng</div>
                                <div> Bảo hiểm Y tế </div>
                                <div className='text-small1'>Có áp dụng</div>
                            </div>

                            <div className='down'>
                                <div> Bảo hiểm bảo lãnh trực tiếp </div>
                                <div className='text-small2'>Phòng khám hiện không áp dụng bảo hiểm bảo lãnh trực tiếp</div>
                            </div>

                            <div className='hide-insurance'>
                                <span onClick={() => this.showDetailIsurance(false)}>Thu gọn</span>
                            </div>
                        </>
                    }
                </div>

            </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
