import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManagePatient.scss';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientForDoctor, postSendRemedy } from '../../../services/userService';
import moment from 'moment';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';

class ManagePatient extends Component {

    constructor(props) {
        super(props)
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            datapatient: [],
            isOpenRemedyModal: false,
            dataModal: {},
            isShowLoading: false
        }
    }

    async componentDidMount() {

        this.getDataPatient()
    }


    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;

        let formatedDate = new Date(currentDate).getTime();

        let res = await getAllPatientForDoctor({
            doctorId: user.id,
            date: formatedDate
        })
        console.log(res)
        if (res && res.errCode === 0) {
            this.setState({
                datapatient: res.data
            })
        }
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, async () => {
            await this.getDataPatient()
        })
    }


    handleBtnConfirm = (item) => {

        let data = {
            doctorId: item.doctorId,
            customerId: item.customerId,
            email: item.patientData.email,
            timeType: item.timeType,
            patientName: item.patientData.firstName,

        }
        this.setState({
            isOpenRemedyModal: true,
            dataModal: data
        })

    }



    closeRemedyModal = () => {
        this.setState({
            isOpenRemedyModal: false,
            dataModal: {}
        })
    }

    sendRemedy = async (dataFromModal) => {

        let { dataModal } = this.state;
        this.setState({
            isShowLoading: true
        })


        let res = await postSendRemedy({
            email: dataFromModal.email,
            imgBase64: dataFromModal.imgBase64,
            doctorId: dataModal.doctorId,
            customerId: dataModal.customerId,
            timeType: dataModal.timeType,
            patientName: dataModal.patientName
        })
        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success('Gửi Thành Công')
            await this.getDataPatient();
            this.closeRemedyModal();
        } else {
            this.setState({
                isShowLoading: false
            })
            toast.error('Gửi Thất Bại')
        }
    }
    render() {

        let { datapatient, isOpenRemedyModal, dataModal } = this.state;
        return (

            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading...'>
                    <div className='manage-patient-container'>
                        <div className='m-p-title'>
                            Quản lý bệnh nhân đặt lịch khám bệnh
                        </div>
                        <div className='manage-patient-body row'>

                            <div className='col-4 form-group'>
                                <label>Chọn ngày khám</label>
                                <DatePicker
                                    onChange={this.handleOnChangeDatePicker}
                                    className='form-control'
                                    value={this.state.currentDate}

                                />
                            </div>
                            <div className='col-12 table-manage-patient'>
                                <table style={{ with: '100%' }}>
                                    <tbody>
                                        <tr>
                                            <th>STT</th>
                                            <th>Thời Gian</th>
                                            <th>Họ và Tên</th>
                                            <th>Địa Chỉ</th>
                                            <th>Giới Tính</th>
                                            <th>Tùy Chọn</th>
                                        </tr>
                                        {datapatient && datapatient.length > 0 ?
                                            datapatient.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.timeType.value_Vi}</td>
                                                        <td>{item.patientData.firstName}</td>
                                                        <td>{item.patientData.address}</td>
                                                        <td>{item.patientData.genderData.value_Vi}</td>
                                                        <td>
                                                            <button className='mp-btn-confirm'
                                                                onClick={() => { this.handleBtnConfirm(item) }}>
                                                                Xác Nhận
                                                            </button>

                                                        </td>
                                                    </tr>
                                                )
                                            })
                                            :
                                            <tr>
                                                <td colSpan={'6'} style={{ textAlign: 'center' }}>Không có dữ liệu</td>
                                            </tr>
                                        }

                                    </tbody>
                                </table>
                            </div>


                        </div>
                    </div>
                    <RemedyModal
                        isOpenModal={isOpenRemedyModal}
                        dataModal={dataModal}
                        closeRemedyModal={this.closeRemedyModal}
                        sendRemedy={this.sendRemedy}
                    />

                </LoadingOverlay >
            </>

        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
