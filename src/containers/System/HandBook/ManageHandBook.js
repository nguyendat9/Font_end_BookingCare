import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageHandBook.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { CRUD_ACTIONS, CommonUtils } from '../../../utils';
import { createNewHandbook } from '../../../services/userService';
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: ''

        }
    }

    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }


    handleOnchangeInput = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        })
    }


    handleOnChaneImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64,
            })
        }


    }


    handleSaveNewHandBook = async () => {

        let res = await createNewHandbook(this.state)
        if (res && res.errCode === 0) {
            toast.success("Thêm cẩm nang thành công !")
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            })
        } else {
            toast.error("Thêm cẩm nang thất bại !")
            console.log('check res: ', res)
        }
    }

    render() {
        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'>Quản Lý Cẩm Nang</div>
                <div className='btn-add-new-specialty'>

                </div>
                <div className='add-new-specialty row'>
                    <div className='col-6 form-group'>
                        <label>Tên Cẩm Nang</label>
                        <input className='form-control' type='text' value={this.state.name}
                            onChange={(event) => this.handleOnchangeInput(event, 'name')}

                        />
                    </div>

                    <div className='col-6 form-group'>
                        <label>Ảnh Cẩm Nang</label>
                        <input className='form-control-file' type='file'
                            onChange={(event) => this.handleOnChaneImage(event)}

                        />
                    </div>


                    <div className='col-12'>
                        <MdEditor style={{ height: '300px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>


                    <div className='col-12'>
                        <button className='btn-save-specialty'
                            onClick={() => this.handleSaveNewHandBook()}>
                            Lưu
                        </button>
                    </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
