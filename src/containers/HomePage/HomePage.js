import React, { Component } from 'react';
import HeaderHome from './HeaderHome';
import { connect } from 'react-redux';
import Specialty from './Section/Specilty';
import MedicalFacilities from './Section/Medicalacilities';
import OutStandingDoctor from './Section/OutStandingDoctor ';
import HandBook from './Section/HandBook';
import About from './Section/About';
import HomeFooter from './HomeFooter';
import './Section/HomePage.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {

    render() {
        let settings = {
            dots: false,
            Infinity: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 2,

        }
        return (
            <div>
                <HeaderHome isShowBanner={true} />
                <Specialty
                    settings={settings}
                />
                <MedicalFacilities
                    settings={settings}
                />
                <OutStandingDoctor
                    settings={settings}
                />
                <HandBook
                    settings={settings}
                />
                <About />
                <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
