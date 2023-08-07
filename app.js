const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'basicdata',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Save a new driver to the MySQL table
app.post('/drivers', (req, res) => {
  const {
    driverName,
    currentMeter,
    states,
    vehicleType,
    group,
    licensePlate,
    assignedVehicle,
  } = req.body;

  const newDriver = {
    driver_name: driverName,
    current_meter: currentMeter,
    states,
    vehicle_type: vehicleType,
    group_name: group,
    license_plate: licensePlate,
    assigned_vehicle: assignedVehicle,
  };

  pool.query('INSERT INTO drivers SET ?', newDriver, (err, results) => {
    if (err) {
      res.status(500).send('Error saving driver');
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
