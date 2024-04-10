const Courses = require("../models/Course");
const {mongooseToObject} = require('../../unti/mongoose')

class CourseController {

  // [GET] /course/:slug
  show(req, res,next) {
    Courses.findOne({slug: req.params.slug})
      .then(course => {
        res.render('courses/show',{
          course : mongooseToObject(course)
        })
      })
      .catch(next)

  }
}

module.exports = new CourseController();
