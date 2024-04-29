const Course = require("../models/Course");
const {multtipleMongooseToObject} = require('../../unti/mongoose');

class MeController {

// [GET] /me/stored/courses
  storedCourses(req,res,next){
    Promise.all([ Course.find({}), Course.countDocumentsWithDeleted({deleted:true})])
      .then(([courses,deleteCount]) =>
        res.render('me/stored-courses',{
          deleteCount,
          courses : multtipleMongooseToObject(courses),
        })
      )
      .catch(next)
  }
  trashCourses(req,res,next){
    Course.findDeleted({deleted: true})
      .then(courses => res.render('me/trash-courses',{ courses : multtipleMongooseToObject(courses.filter(course => course.deleted))}))
      .catch(next)
  }
}

module.exports = new MeController();
