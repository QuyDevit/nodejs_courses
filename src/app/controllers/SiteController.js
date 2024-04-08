const Course = require('../models/Courses');

class SiteController {
  // [GET] /
  async index(req, res) {
    try {
          const courses = await Course.find({});
          res.json(courses);
    } catch (error) {
       res.status(500).json({ error: error.message });
    }

    // res.render('home');
  }
  // [GET] /search
  search(req, res) {
    res.render('search');
  }
}

module.exports = new SiteController();
