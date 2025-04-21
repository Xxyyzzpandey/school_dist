import {db} from '../db/connectdb.js';
import { calculateDistance } from './dist.controller.js';
import { isValidCoordinates } from './dist.controller.js';

const addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;
   
  if (!name || !address || !latitude || !longitude){
    return res.status(400).json({ error: 'Invalid input data.' });
  }

  if (typeof name !== 'string' || typeof address !== 'string' || !isValidCoordinates(latitude, longitude)) {
    return res.status(400).json({ error: 'Invalid input data.' });
  }
  
  try {
    await db.execute(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, latitude, longitude]
    );
    res.status(201).json({ message: 'School added successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
};

const schoolList = async (req, res) => {
  const userLat = parseFloat(req.query.latitude);
  const userLng = parseFloat(req.query.longitude);
  if (!isValidCoordinates(userLat, userLng)) {
    return res.status(400).json({ error: 'Invalid coordinates.' });
  }

  try {
    const [schools] = await db.execute('SELECT * FROM schools');
    console.log(schools);
    const sorted = schools
      .map(school => ({
        ...school,
        distance: calculateDistance(userLat, userLng, school.latitude, school.longitude)
      }))
      .sort((a, b) => a.distance - b.distance);

    res.status(200).json(sorted);
  } catch (err) {
    res.status(500).json({ error: 'Database error', details: err.message });
  }
};

export {addSchool,schoolList}
