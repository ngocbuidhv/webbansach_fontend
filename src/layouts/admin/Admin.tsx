import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardPage from './DashboardPage';
import FormThemSach from './conponents/sach/FormThemSach';
import QuanLySach from './conponents/sach/QuanLySach';


function Admin() {
    return (
        <div>
            <DashboardPage />
        </div>
    );
}

export default Admin;
