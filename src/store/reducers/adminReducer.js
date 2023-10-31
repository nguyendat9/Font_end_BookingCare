import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    gender: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allScheduleTime: [],

    allRequiredDoctorInfor: [],
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        // bat dau
        case actionTypes.FETCH_GENDER_STARTS:
            let copyState = { ...state };
            copyState.isLoadingGender = true;
            return {
                ...state

            }
        // dang thuc hien
        case actionTypes.FETCH_GENDER_SUCCESS:

            state.gender = action.data;
            state.isLoadingGender = false;
            return {
                ...state,

            }
        // ket thuc
        case actionTypes.FETCH_GENDER_FAIDED:

            state.isLoadingGender = false;
            state.gender = [];

            return {
                ...state,

            }
        case actionTypes.FETCH_POSITION_SUCCESS:

            state.positions = action.data;

            return {
                ...state,

            }
        // ket thuc
        case actionTypes.FETCH_POSITION_FAIDED:


            state.positions = [];

            return {
                ...state,

            }

        case actionTypes.FETCH_ROLE_SUCCESS:

            state.roles = action.data;

            return {
                ...state,

            }
        // ket thuc
        case actionTypes.FETCH_ROLE_FAIDED:


            state.roles = [];

            return {
                ...state,

            }


        case actionTypes.FETCH_ALL_USER_SUCCESS:


            state.users = action.users;

            return {
                ...state

            }

        case actionTypes.FETCH_ALL_USER_FAILED:


            state.users = [];

            return {
                ...state,

            }


        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:


            state.topDoctors = action.data;

            return {
                ...state

            }


        case actionTypes.FETCH_TOP_DOCTOR_FAILED:


            state.topDoctors = [];

            return {
                ...state,

            }


        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:


            state.allDoctors = action.data;

            return {
                ...state

            }


        case actionTypes.FETCH_ALL_DOCTOR_FAILED:


            state.allDoctors = [];

            return {
                ...state,

            }


        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:


            state.allScheduleTime = action.dataTime;

            return {
                ...state

            }


        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:


            state.allScheduleTime = [];

            return {
                ...state,

            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:


            state.allRequiredDoctorInfor = action.data;
            return {
                ...state

            }


        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAIDED:


            state.allRequiredDoctorInfor = [];

            return {
                ...state,

            }
        default:
            return state;
    }
}

export default adminReducer;