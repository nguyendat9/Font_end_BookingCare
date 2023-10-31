import React, { Component } from 'react';
import { connect } from 'react-redux';



class HomeFooter extends Component {



    render() {


        return (
            <div className='home-footer'>
                <p>&copy; 2023 Nguyễn Hữu Đạt. My Infomation
                    <a target='_blank' href='https://www.facebook.com/profile.php?id=100057353771252'>
                        &#8594;Click Here &#8592;</a>
                </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
