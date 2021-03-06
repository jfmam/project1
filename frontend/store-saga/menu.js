import { takeLatest,call,all,fork,put } from 'redux-saga/effects'
import axios from 'axios'
import  { CODE_REQUEST, CODE_SUCCESS, CODE_FAILURE, MENUPOST_REQUEST, MENUPOST_FAILURE, MENUPOST_SUCCESS,
    GETALLBOOTHINFO_REQUEST,GETALLBOOTHINFO_SUCCESS,CODECREATE_REQUEST,CODECREATE_FAILURE,CODECREATE_SUCCESS,
    GETALLBOOTHINFO_FAILURE } from '../store/menu'


function PostMenuAPI(menuData){
    console.log(menuData)
 return axios.patch('/admin',menuData);
}

function* PostMenu(action){
    try{
    const result=yield call(PostMenuAPI,action.data);
    yield put({
        type:MENUPOST_SUCCESS,
        data:result.data
    })
    }catch(e){
        yield put({
        type:MENUPOST_FAILURE,
        error:e
        })
    }
}

function* watchPostMenu() {
  yield takeLatest(MENUPOST_REQUEST,PostMenu);
}

function loadCodeAPI(Code){
 return axios.get(`/admin/${Code}`);
}

function* loadCode(action){
    try{
    const result=yield call(loadCodeAPI,action.data);
    yield put({
        type:CODE_SUCCESS,
        data:result.data
        //code정보를 보내줘야하나? code를 보내주면 한번에 정보를 보내줘야하지않을까?
    })
    }catch(e){
        yield put({
        type:CODE_FAILURE,
        error:e
        })
    }
}

function* watchCode() {
  yield takeLatest(CODE_REQUEST,loadCode);
}

function loadCodePostAPI(Code){
 return axios.post(`/admin/code`,Code);
}

function* loadCodePost(action){
    try{
    const result=yield call(loadCodePostAPI,action.data);
    yield put({
        type:CODECREATE_SUCCESS,
        data:result.data
      
    })
    }catch(e){
        yield put({
        type:CODECREATE_FAILURE,
        error:e
        })
    }
}

function* watchCodePost() {
  yield takeLatest(CODECREATE_REQUEST,loadCodePost);
}

function loadBoothAPI(){
 return axios.get('/admin/boothmap',{});
}

function* loadBoothInfo(action){
    try{
    const result=yield call(loadBoothAPI);
    yield put({
        type:GETALLBOOTHINFO_SUCCESS,
        data:result.data
    })
    }catch(e){
        yield put({
        type:GETALLBOOTHINFO_FAILURE,
        error:e
        })
    }
}

function* watchAllBoothInfo() {
  yield takeLatest(GETALLBOOTHINFO_REQUEST,loadBoothInfo);
}

 
export default function* menuSaga(){
    yield all([
        fork(watchPostMenu),
        fork(watchCode),
        fork(watchAllBoothInfo),
        fork(watchCodePost)
    ])
}