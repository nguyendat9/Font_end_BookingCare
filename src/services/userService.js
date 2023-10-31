
import axios from "../axios";

const handleLoginApi = (userEmail, userPassword) => {
    return axios.post('/api/login', { email: userEmail, password: userPassword })
}

const getAllUser = (inputId) => {

    return axios.get(`/api/get-all-user?id=${inputId}`)
}
const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
    // return axios.delete('/api/delete_use', { id: userId })
    return axios.delete('/api/delete_user', {
        data: {
            id: userId
        }
    });
}

const getAllCodeService = (inputdata) => {

    return axios.get(`/api/allcode?type=${inputdata}`);
}

const editUserService = (inputdata) => {
    return axios.put('/api/edit_user', inputdata);

}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top_doctor_home?limit=${limit}`)
}

const getAllDoctors = () => {
    return axios.get('/api/get_all_doctors')
}
const saveDetailDoctorService = (data) => {
    return axios.post('/api/save_infor_doctors', data)
}

const getDetailInforDoctor = (inputId) => {
    return axios.get(`/api/get_detail_doctor_by_id?id=${inputId}`)
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data)
}

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get_schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}


const getExtraInforDoctorById = (doctorId, date) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}

const getProfileDoctorById = (doctorId, date) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}

const postPatientBookAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data)
}


const postVerifyBookAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data)
}

const getAllSpeciality = () => {
    return axios.get(`/api/get-specialty`)
}
const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data)
}

const getAllDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}


const createNewClinic = (data) => {
    return axios.post(`/api/create-new-clinic`, data)
}

const getAllClinic = () => {
    return axios.get(`/api/get-clinic`)
}

const getAllDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`)
}

const createNewHandbook = (data) => {
    return axios.post(`/api/create-new-handbook`, data)
}

const getAllHandBook = () => {
    return axios.get(`/api/get-handbook`)
}

const getAllPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`)
}

const postSendRemedy = (data) => {
    return axios.post(`/api/send-remedy`, data)
}


export {
    handleLoginApi, getAllUser,
    createNewUserService, deleteUserService,
    editUserService, getAllCodeService,
    getTopDoctorHomeService, getAllDoctors, saveDetailDoctorService,
    getDetailInforDoctor, saveBulkScheduleDoctor,
    getScheduleDoctorByDate, getExtraInforDoctorById, getProfileDoctorById,
    postPatientBookAppointment, postVerifyBookAppointment,
    getAllSpeciality, createNewSpecialty, getAllDetailSpecialtyById,
    createNewClinic, getAllClinic, getAllDetailClinicById,
    createNewHandbook, getAllHandBook, getAllPatientForDoctor,
    postSendRemedy
}
