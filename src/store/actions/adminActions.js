import actionTypes from './actionTypes';
import {
    getAllCodeService, getAllDoctors, saveDetailDoctorService,
    createNewUserService, getAllUser, deleteUserService,
    editUserService, getTopDoctorHomeService, getAllSpeciality,
    getAllClinic
} from '../../services/userService';
import { toast } from 'react-toastify';


export const fetchGenderStart = () => {

    return async (dispatch, getState) => {

        try {
            // dispatch({
            //     type: actionTypes.FETCH_GENDER_STARTS
            // })
            let res = await getAllCodeService("GENDER")
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFaided());
            }
        } catch (e) {
            dispatch(fetchGenderFaided());
            console.log(e)
        }
    }

}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFaided = () => ({
    type: actionTypes.FETCH_GENDER_FAIDED
})
/**
 * 
 */

export const fetchPositionStart = () => {

    return async (dispatch, getState) => {

        try {
            let res = await getAllCodeService("POSITION")
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFaided());
            }
        } catch (e) {
            dispatch(fetchPositionFaided());
            console.log(e)
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFaided = () => ({
    type: actionTypes.FETCH_POSITION_FAIDED
})

/**
 * 
 */

export const fetchRoleStart = () => {

    return async (dispatch, getState) => {

        try {

            let res = await getAllCodeService("ROLE")
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFaided());
            }
        } catch (e) {
            dispatch(fetchRoleFaided());
            console.log(e)
        }
    }

}

export const fetchRoleSuccess = (RoleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: RoleData
})

export const fetchRoleFaided = () => ({
    type: actionTypes.FETCH_ROLE_FAIDED
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {

        try {

            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new user success!")
                dispatch(saveUserSuccess(res.data));
                dispatch(fetchAllUserStart());
            } else {
                toast.error("Create user Error!")
                dispatch(saveUserFaided());
            }
        } catch (e) {
            toast.error("Create user Error!")
            dispatch(saveUserFaided());
            console.log(e)
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})
export const saveUserFaided = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUserStart = () => {

    return async (dispatch, getState) => {

        try {

            let res = await getAllUser("ALL");

            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.user.reverse()));
            } else {
                toast.error("Fetch all user Error!")
                dispatch(fetchAllUserFaided());
            }
        } catch (e) {
            dispatch(fetchAllUserFaided());
            console.log(e)
        }
    }
}
export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,

    users: data
})
export const fetchAllUserFaided = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED,

})

export const DeleteUser = (userId) => {
    return async (dispatch, getState) => {

        try {

            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("Delete user succesd!")
                dispatch(deleteUserSuccess(res.data));
                dispatch(fetchAllUserStart());
            } else {
                toast.error("Delete user Error!")
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            toast.error("Delete user Error!")
            dispatch(deleteUserFailed());
            console.log(e)
        }
    }

}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})


export const editUser = (data) => {
    return async (dispatch, getState) => {

        try {

            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Update user succesd!")
                dispatch(EditUserUserSuccess(res.data));
                dispatch(fetchAllUserStart());
            } else {
                toast.error("Update user Error!")
                dispatch(EditUserFailed());
            }
        } catch (e) {
            toast.error("Update user Error!")
            dispatch(EditUserFailed());
            console.log(e)
        }
    }

}
export const EditUserUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const EditUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('')
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAILED
                })
            }
        } catch (e) {
            console.log(e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILED
            })
        }
    }
}

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTOR_FAILED
                })
            }
        } catch (e) {
            console.log(e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTOR_FAILED
            })
        }
    }
}

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data)
            if (res && res.errCode === 0) {
                toast.success("Save doctor succesd!");
                dispatch({

                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,

                })
            } else {
                toast.error("Save doctor error!");
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
                })
            }
        } catch (e) {
            toast.error("Save doctor error!");

            console.log(e)
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED
            })
        }
    }
}


export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME")
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
                })
            }
        } catch (e) {
            console.log(e)
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
            })
        }
    }
}


export const getRequiredDoctorInfor = () => {

    return async (dispatch, getState) => {


        try {
            // dispatch({
            //     type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_STARTS
            // })
            let resPrice = await getAllCodeService("PRICE");
            let resPayment = await getAllCodeService("PAYMENT");
            let resProvince = await getAllCodeService("PROVINCE");
            let resSpecialty = await getAllSpeciality();
            let resClinic = await getAllClinic();

            if (resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0
                && resSpecialty && resSpecialty.errCode === 0
                && resClinic && resClinic.errCode === 0) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data
                }
                dispatch(fetchAllRequiredDoctorInforSuccess(data));
            } else {
                dispatch(fetchAllRequiredDoctorInforFaided())
            }
        }
        catch (e) {
            dispatch(fetchAllRequiredDoctorInforFaided());
            console.log(e)
        }
    }

}
export const fetchAllRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData
})
export const fetchAllRequiredDoctorInforFaided = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAIDED
})