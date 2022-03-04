import '../App.css'

import MyChart from "./mychart";
import { useState } from 'react';
import classNames from 'classnames';
import Post from './post';

function Main() {
    const [tab, setTab] = useState('cases');
    const baseURL = window.location.origin + '/';
    return (
        <div className="chart">
            <div className="chart-header">
                <img src="/img/logocovid.svg" alt="logo"></img>
                <b>Thông tin Covid-19 tại Việt Nam</b>
            </div>
            <Navbar setTab={setTab} classNames={classNames} tab={tab} />
            {tab === 'cases' && <MyChart></MyChart>}
            {tab === 'preventive' && <Post URL={`${baseURL}/preventive.json`}></Post>}
            {tab === 'symptom' && <Post URL={`${baseURL}/symptom.json`}></Post>}
            {tab === 'treating' && <Post URL={`${baseURL}/treating.json`}></Post>}
            {tab === 'qna' && <Post URL={`${baseURL}/qna.json`}></Post>}
        </div >
    );
}

export default Main;

function Navbar({ setTab, classNames, tab }) {
    return (<div className="chart-body">
        <div onClick={() => {
            setTab('cases');
        }} className={classNames('tab', {
            activetab: tab === 'cases'
        })}>Số ca nhiễm
        </div>
        <div onClick={() => {
            setTab('preventive');
        }} className={classNames('tab', {
            activetab: tab === 'preventive'
        })}>Phòng ngừa
        </div>
        <div onClick={() => {
            setTab('symptom');
        }} className={classNames('tab', {
            activetab: tab === 'symptom'
        })}>Triệu chứng
        </div>
        <div onClick={() => {
            setTab('treating');
        }} className={classNames('tab', {
            activetab: tab === 'treating'
        })}>Điều trị
        </div>
        <div onClick={() => {
            setTab('qna');
        }} className={classNames('tab', {
            activetab: tab === 'qna'
        })}>Hỏi đáp
        </div>
    </div>);
}
