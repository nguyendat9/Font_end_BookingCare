import React, { Component } from 'react';
import './Medicalfacilities.scss';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { getAllClinic } from '../../../services/userService'
import { withRouter } from 'react-router';


class MedicalFacilities extends Component {


    constructor(props) {
        super(props);
        this.state = {
            dataClinic: [],

        }
    }

    async componentDidMount() {
        let res = await getAllClinic();
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.data ? res.data : []
            })
        }
    }

    handleViewDetailClinic = (clinic) => {
        this.props.history.push(`/detail-clinic/${clinic.id}`)
    }

    render() {
        let { dataClinic } = this.state;
        return (
            <div className='section-share section-medical-facilities'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cơ Sở Y Tế Nổi Bật</span>
                        <button className='btn-section'>Xem Thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataClinic && dataClinic.length > 0 &&
                                dataClinic.map((item, index) => {
                                    return (
                                        <div className='section-customize clinic-child'
                                            key={index}
                                            onClick={() => this.handleViewDetailClinic(item)}

                                        >
                                            <div className='bg-image section-medical'
                                                style={{ backgroundImage: `url(${item.image})` }}
                                            >

                                            </div>
                                            <div className='name-clinic'>{item.name}</div>
                                        </div>
                                    )
                                })
                            }



                        </Slider>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacilities));
