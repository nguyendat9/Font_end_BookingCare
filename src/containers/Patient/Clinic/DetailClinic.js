import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailClinic.scss';
import HeaderHome from '../../HomePage/HeaderHome';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfo';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllDetailClinicById } from '../../../services/userService';
import _ from 'lodash';
import { getAllCodeService } from '../../../services/userService';


class DetailClinic extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrDoctorId: [],
            dataDetailClinic: {},

        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;

            let res = await getAllDetailClinicById({
                id: id,

            });


            if (res && res.errCode === 0) {
                let data = res.data;
                let arrDoctorId = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data.doctorClinic;

                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })

                    }

                }

                this.setState({
                    dataDetailClinic: res.data,
                    arrDoctorId: arrDoctorId,

                })

            }


        }
    }


    async componentDidUpdate(prevProps, prevState, snapshot) {

    }




    render() {
        let { arrDoctorId, dataDetailClinic } = this.state;
        console.log('check state', this.state);
        return (

            <div className='detail-specialty-container'>
                <HeaderHome />
                <div className='detail-specialty-body'>

                    <div className='description-specialty'>
                        {dataDetailClinic && !_.isEmpty(dataDetailClinic)

                            &&
                            <>
                                <div>{dataDetailClinic.name}</div>
                                <div dangerouslySetInnerHTML={{ __html: dataDetailClinic.descriptionHTML }}>

                                </div>
                            </>
                        }

                    </div>


                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {

                            return (
                                <div className='each-doctor'>

                                    <div className='dt-content-left'>
                                        <div className='profile-doctor'>
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescriptionDoctor={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            //  dataTime={dataTime}
                                            />
                                        </div>
                                    </div>

                                    <div className='dt-content-right'>

                                        <div className='doctor-schedule'>
                                            <DoctorSchedule
                                                doctorIdFromParent={item}
                                                key={index}
                                            />
                                        </div>

                                        <div className='doctor-extra-infor'>
                                            <DoctorExtraInfor
                                                doctorIdFromParent={item}
                                            />
                                        </div>

                                    </div>

                                </div>
                            )
                        })
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
