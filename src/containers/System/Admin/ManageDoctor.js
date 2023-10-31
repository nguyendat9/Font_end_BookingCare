import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import * as actions from '../../../store/actions';
import Select from 'react-select';
import { CRUD_ACTIONS } from '../../../utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { getDetailInforDoctor } from "../../../services/userService"



// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);


class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {

            //luu bang markdown 
            contentMarkdown: '',
            contentHTML: '',
            SelectedOptions: '',
            description: '',
            listDoctors: [],
            hasOldData: true,


            //luu thong tin bac si trong bang
            listPrice: [],
            listPayment: [],
            listProvince: [],
            listClinic: [],
            listSpecialty: [],



            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            selectedClinic: '',
            selectedSpecialty: '',

            nameClinic: '',
            addressClinic: '',
            note: '',
            clinicId: '',
            specialtyId: '',

        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.getRequiredDoctorInfor();
    }

    buildDataInputSelect = (inputData, type) => {
        let result = [];

        if (inputData && inputData.length > 0) {
            if (type === 'USERS') {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVi = `${item.firstName} ${item.lastName}`;
                    obj.label = labelVi;
                    obj.value = item.id;
                    result.push(obj);
                })
            }
            if (type === 'PRICE') {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVi = `${item.value_Vi} `;
                    obj.label = labelVi;
                    obj.value = item.keyMap;
                    result.push(obj);
                })
            }
            if (type === 'PAYMENT' || type === 'PROVINCE') {
                inputData.map((item, index) => {
                    let obj = {};
                    let labelVi = `${item.value_Vi} `;
                    obj.label = labelVi;
                    obj.value = item.keyMap;
                    result.push(obj);
                })
            }
            if (type === 'SPECIALTY') {
                inputData.map((item, index) => {
                    let obj = {};
                    obj.label = item.name;
                    obj.value = item.id;
                    result.push(obj);
                })
            }

            if (type === 'CLINIC') {
                inputData.map((item, index) => {
                    let obj = {};
                    obj.label = item.name;
                    obj.value = item.id;
                    result.push(obj);
                })
            }


        }
        return result
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS')
            this.setState({
                listDoctors: dataSelect
            })
        }

        if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
            let { resPrice, resPayment, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfor;

            let dataSelectedPrice = this.buildDataInputSelect(resPrice, 'PRICE');
            let dataSelectedPayment = this.buildDataInputSelect(resPayment, 'PAYMENT');
            let dataSelectedProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
            let dataSelectedSpecialty = this.buildDataInputSelect(resSpecialty, 'SPECIALTY')
            let dataSelectClinic = this.buildDataInputSelect(resClinic, 'CLINIC')

            // console.log('check data new', dataSelectedPrice, dataSelectedPayment, dataSelectedProvince, dataSelectedSpecialty);

            this.setState({
                listPrice: dataSelectedPrice,
                listPayment: dataSelectedPayment,
                listProvince: dataSelectedProvince,
                listSpecialty: dataSelectedSpecialty,
                listSpecialty: dataSelectedSpecialty,
                listClinic: dataSelectClinic
            })
        }
    }


    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        })
    }

    handleSaveContentMarkdown = () => {


        let { hasOldData } = this.state;
        this.props.saveDetailDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.SelectedOptions.value,
            action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

            selectedPrice: this.state.selectedPrice.value,
            selectedPayment: this.state.selectedPayment.value,
            selectedProvince: this.state.selectedProvince.value,
            nameClinic: this.state.nameClinic,
            addressClinic: this.state.addressClinic,
            note: this.state.note,
            clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
            specialtyId: this.state.selectedSpecialty.value
        })

    }

    handleChangeSelect = async (SelectedOptions) => {
        this.setState({ SelectedOptions });

        let { listPayment, listPrice, listProvince, listSpecialty, listClinic } = this.state;

        let res = await getDetailInforDoctor(SelectedOptions.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;


            let addressClinic = '', nameClinic = '', note = '', paymentId = '',
                priceId = '', provinceId = '', specialtyId = '', clinicId = '',
                selectedPayment = '', selectedPrice = '', selectedProvince = '',
                selectedSpecialty = '', selectedClinic = ''



            if (res.data.Doctor_Infor) {

                addressClinic = res.data.Doctor_Infor.addressClinic;
                nameClinic = res.data.Doctor_Infor.nameClinic;
                note = res.data.Doctor_Infor.note;
                paymentId = res.data.Doctor_Infor.paymentId;
                priceId = res.data.Doctor_Infor.priceId;
                provinceId = res.data.Doctor_Infor.provinceId;
                specialtyId = res.data.Doctor_Infor.specialtyId;
                clinicId = res.data.Doctor_Infor.clinicId

                selectedPayment = listPayment.find(item => {
                    return item && item.value === paymentId
                })

                selectedPrice = listPrice.find(item => {
                    return item && item.value === priceId
                })

                selectedProvince = listProvince.find(item => {
                    return item && item.value === provinceId
                })

                selectedSpecialty = listSpecialty.find(item => {
                    return item && item.value === specialtyId
                })


                selectedClinic = listClinic.find(item => {
                    return item && item.value === clinicId
                })

            }

            this.setState({
                contentHTML: markdown.contentHTML,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
                hasOldData: true,
                addressClinic: addressClinic,
                nameClinic: nameClinic,
                note: note,
                selectedPayment: selectedPayment,
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic


            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
                hasOldData: false,
                addressClinic: '',
                nameClinic: '',
                note: '',
                addressClinic: '',
                selectedPayment: '',
                selectedPrice: '',
                selectedProvince: '',
                selectedSpecialty: '',
                selectedClinic: '',

            })
        }

    }

    handleChangeSelectDoctorInfor = async (selectedOption, name) => {

        let stateName = name.name;

        let stateCopy = { ...this.state };
        stateCopy[stateName] = selectedOption;

        this.setState({
            ...stateCopy
        })
    }

    handleChangeText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;

        this.setState({
            ...stateCopy
        })
    }

    render() {
        console.log('check state', this.state)
        let { hasOldData, listSpecialty, listClinic } = this.state;
        return (
            <div className='manage-doctor-container'>

                <div className='manage-doctor-title'>Create Infomation Doctor</div>
                <div className='more-infor'>
                    <div className='content-left form-group'>

                        <label>Chọn Bác Sĩ:</label>

                        <Select
                            value={this.state.SelectedOptions}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                            placeholder={'Chọn bác sĩ'}
                        />
                    </div>
                    <div className='content-right '>
                        <label>Thông tin giới thiệu:</label>
                        <textarea className='form-control'
                            onChange={(event) => this.handleChangeText(event, 'description')}
                            value={this.state.description}>

                        </textarea>
                    </div>

                </div>

                <div className='more-infor-extra row'>
                    <div className='col-4 form-group '>
                        <label>Chọn giá:</label>
                        <Select
                            value={this.state.selectedPrice}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPrice}
                            placeholder={'Chọn giá'}
                            name="selectedPrice"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chọn phương thức thanh toán:</label>
                        <Select
                            value={this.state.selectedPayment}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listPayment}
                            placeholder={'Chọn phương thức thanh toán'}
                            name="selectedPayment"
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chọn tỉnh thành:</label>
                        <Select
                            value={this.state.selectedProvince}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listProvince}
                            placeholder={'Chọn tỉnh thành'}
                            name="selectedProvince"
                        />
                    </div>
                    <div className='col-4 form-group '>
                        <label>Tên phòng khám</label>
                        <input className='form-control'
                            onChange={(event) => this.handleChangeText(event, 'nameClinic')}
                            value={this.state.nameClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Địa chỉ phòng khám:</label>
                        <input className='form-control'
                            onChange={(event) => this.handleChangeText(event, 'addressClinic')}
                            value={this.state.addressClinic}
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Note:</label>
                        <input className='form-control'
                            onChange={(event) => this.handleChangeText(event, 'note')}
                            value={this.state.note}
                        />
                    </div>
                </div>

                <div className='row'>
                    <div className='col-4 form-group'>
                        <label>Chọn Chuyên Khoa</label>
                        <Select
                            value={this.state.selectedSpecialty}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listSpecialty}
                            placeholder={'Chọn Chuyên Khoa'}
                            name='selectedSpecialty'
                        />
                    </div>
                    <div className='col-4 form-group'>
                        <label>Chọn Phòng Khám</label>
                        <Select
                            value={this.state.selectedClinic}
                            onChange={this.handleChangeSelectDoctorInfor}
                            options={this.state.listClinic}
                            placeholder={'Chọn Phòng Khám'}
                            name='selectedClinic'
                        />
                    </div>
                </div>


                <div className='manage-doctor-editor'>

                    <MdEditor style={{ height: '300px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>

                <button
                    onClick={() => this.handleSaveContentMarkdown()}
                    className={hasOldData === true ? "save-content-doctor" : "create-content-doctor"}>
                    {hasOldData === true ? <span>Lưu thông tin </span> : <span>Tạo thông tin</span>}
                </button>

            </div>
        );
    }

}

const mapStateToProps = state => {

    return {
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
        allDoctors: state.admin.allDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => { dispatch(actions.fetchAllDoctors()) },
        getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),

        saveDetailDoctor: (data) => { dispatch(actions.saveDetailDoctor(data)) }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
