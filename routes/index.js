const express = require('express');

const app = express();
const UserRoutes = require('./user.routes');
const AuthRoutes = require('./auth.routes');
const HospitalesRoutes = require('./hospitals.routes');
const DoctorRoutes = require('./doctor.routes');
const SearchRoutes = require('./search.routes');
const UploadsRoutes = require('./uploads.routes');

app.use('/usuarios', UserRoutes);
app.use('/login', AuthRoutes);
app.use('/hospitales', HospitalesRoutes);
app.use('/doctor', DoctorRoutes);
app.use('/todo', SearchRoutes);
app.use('/upload', UploadsRoutes);

module.exports = app;
