import React, { Component } from 'react';
import { connect } from "react-redux";
import './BookingModal.scss';
import { Modal } from 'reactstrap';
import { classNames } from 'react-select/dist/index-fe3694ff.cjs.dev';
import ProfileDoctor from '../ProfileDoctor';
import { getProfileDoctorById } from '../../../../services/userService';
import _, { flatMap } from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import Select from 'react-select';
import { postPatientBookAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import NumberFormat from 'react-number-format';
import moment from 'moment/moment';


class BookingModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birtday: '',
            selectedGender: '',
            doctorId: '',
            gender: '',
            timeType: ''
        }
    }

    async componentDidMount() {
        this.props.getGender();

    }
    builDataGender = (data) => {
        let result = [];

        if (data && data.length > 0) {
            data.map(item => {
                let obj = {};
                obj.label = item.value_Vi;
                obj.value = item.keyMap;
                result.push(obj);
            })
        }
        return result
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.gender != prevProps.gender) {

            this.setState({
                gender: this.builDataGender(this.props.gender)
            })
        }

        if (this.props.dataTime !== prevProps.dataTime) {
            if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
                let doctorId = this.props.dataTime.doctorId;
                let timeType = this.props.dataTime.timeType;
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }

    }


    handleOnchangeInput = (event, id) => {
        let valueInput = event.target.value

        let stateCopy = { ...this.state };
        stateCopy[id] = valueInput;
        this.setState({
            ...stateCopy
        })
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            birtday: date[0]
        })
    }

    handlechangeSelect = (selectedOption) => {
        this.setState({ selectedGender: selectedOption })
    }

    buildTimeBooking = (dataTime) => {

        if (dataTime && !_.isEmpty(dataTime)) {

            let time = dataTime.timeTypeData.value_Vi;
            let date = moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
            return `${time} - ${date}`

        }
        return ''

    }

    buildDoctorName = (dataTime) => {

        if (dataTime && !_.isEmpty(dataTime)) {
            let name = `${dataTime.doctorData.firstName}  ${dataTime.doctorData.lastName}`
            return name;
        }
        return ''

    }



    handleConfirmBooking = async () => {
        //validate input
        // data.email || !data.doctorId || !data.timeType || !data.birtday
        let date = new Date(this.state.birtday).getTime();
        let timeString = this.buildTimeBooking(this.props.dataTime)
        let doctorName = this.buildDoctorName(this.props.dataTime)

        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataTime.date,
            birtday: date,
            timeType: this.state.timeType,
            doctorId: this.state.doctorId,
            selectedGender: this.state.selectedGender.value,
            timeString: timeString,
            doctorName: doctorName
        })

        if (res && res.errCode === 0) {
            toast.success('Đặt lịch hẹn mới thành công !!')
            this.props.closeBookingModal();
        } else {
            toast.error('Đặt lịch hẹn mới thất bại !!')

        }
    }

    render() {
        let { isOpenModal, closeBookingModal, dataTime, } = this.props;
        //cach 1:
        let doctorId = '';
        if (dataTime && !_.isEmpty(dataTime)) {
            doctorId = dataTime.doctorId
        }

        return (
            <Modal isOpen={isOpenModal} className={'booking-modal-container'}
                size='medium' centered>
                <div className='booking-modal-content'>
                    <div className='booking-modal-header'>
                        <span className='left'>Thông tin đặt lịch khám bệnh</span>
                        <span className='right' onClick={closeBookingModal}><i className='fas fa-times'></i></span>
                    </div>
                    <div className='booking-modal-body'>
                        {/* {JSON.stringify(dataTime)} */}
                        <div className='doctor-infor'>
                            <ProfileDoctor
                                doctorId={doctorId}
                                isShowDescriptionDoctor={false}
                                dataTime={dataTime}
                                isShowLinkDetail={false}
                                isShowPrice={true}
                            />

                        </div>

                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Họ và Tên</label>
                                <input className='form-control'
                                    value={this.state.fullName}
                                    onChange={(event) => this.handleOnchangeInput(event, 'fullName')}
                                />
                            </div>

                            <div className='col-6 form-group'>
                                <label>Số điện thoại</label>
                                <input className='form-control'
                                    value={this.state.phoneNumber}
                                    onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')} />
                            </div>

                            <div className='col-6 form-group'>
                                <label>Email</label>
                                <input className='form-control'
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnchangeInput(event, 'email')} />

                            </div>

                            <div className='col-6 form-group'>
                                <label>Địa chỉ liên hệ</label>
                                <input className='form-control'
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnchangeInput(event, 'address')} />
                            </div>

                            <div className='col-12 form-group'>
                                <label>Lý do khám</label>
                                <input className='form-control' value={this.state.reason}
                                    onChange={(event) => this.handleOnchangeInput(event, 'reason')} />
                            </div>

                            <div className='col-6 form-group'>
                                <label>Ngày sinh</label>

                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className='form-control'
                                    value={this.state.birtday}
                                />

                            </div>

                            <div className='col-6 form-group'>
                                <label>Giới tính</label>
                                <Select
                                    value={this.state.selectedGender}
                                    onChange={this.handlechangeSelect}
                                    options={this.state.gender}

                                />
                            </div>

                        </div>
                    </div>
                    <div className='booking-modal-footer'>

                        <button className='btn-booking-confirm' onClick={() => this.handleConfirmBooking()}>
                            Xác Nhận
                        </button>

                        <button className='btn-booking-cancel' onClick={closeBookingModal}>
                            Hủy
                        </button>

                    </div>
                </div>



            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        gender: state.admin.gender,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGender: () => dispatch(actions.fetchGenderStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
