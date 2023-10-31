import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { withRouter } from 'react-router';
import './HandBook.scss'
import { getAllHandBook } from '../../../services/userService';

class HandBook extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dataHandBook: []
        }
    }

    async componentDidMount() {
        let res = await getAllHandBook();

        if (res && res.errCode === 0) {
            this.setState({
                dataHandBook: res.data ? res.data : []
            })
        }
    }

    handleViewDetailHandBook = (item) => {
        // this.props.history.push(`/detail-handbook/${item.id}`)

    }
    render() {

        let { dataHandBook } = this.state;
        return (
            <div className='section-share section-handbook' style={{ background: '#f5f5f5' }}>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cẩm Nang</span>
                        <button className='btn-section'>Xem Thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {dataHandBook && dataHandBook.length > 0 &&
                                dataHandBook.map((item, index) => {
                                    return (
                                        <div className='section-customize' key={index}
                                            onClick={() => this.handleViewDetailHandBook(item)}
                                        >
                                            <div className='bg-image section-handbook'

                                                style={{ backgroundImage: `url(${item.image})` }}
                                            > <a href='/'></a></div>
                                            <div style={{ textAlign: 'center', padding: '5px' }} className='name-handbook'>{item.name}</div>
                                        </div>
                                    )
                                })}


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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HandBook));
