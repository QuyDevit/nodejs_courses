const Course = require("../models/Course");
const {mongooseToObject} = require('../../unti/mongoose');

class CourseController {

  // [GET] /course/:slug
  show(req, res,next) {
    Course.findOne({slug: req.params.slug})
      .then(course => {
        res.render('courses/show',{
          course : mongooseToObject(course)
        })
      })
      .catch(next)
  }
// [GET] /course/create
  create(req,res,next){
    res.render('courses/create')
  }
// [POST] /course/store
  store(req,res,next){
    const formData = req.body;
    formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
    const course = new Course(formData);
    course.save()
      .then(()=> res.redirect('/'))
      .catch(error =>{
        
      });
  }
   edit(req,res,next){
    Course.findById(req.params.id)
      .then(course => res.render('courses/edit',{course :mongooseToObject(course) }))
      .catch(next)
  }
  // [PUT] /course/:id
  update(req,res,next){
     Course.updateOne({_id:req.params.id}, req.body)
        .then(() => res.redirect('/me/stored/courses'))
        .catch(next)
  }

  // [PATCH] /course/:id/restore
  restore(req,res,next){
     Course.restore({_id:req.params.id})
        .then(() => res.redirect('back'))
        .catch(next)
  }

  // [POST] /course/handle-form-actions
  hanldeFormActions(req,res,next){
      switch(req.body.action){
        case 'delete':
          Course.delete({_id: {$in :req.body.courseIds} })
          .then(()=> res.redirect('back'))
          .catch(next);
          break;
        case 'restore':
           Course.restore({_id:{$in :req.body.courseIds}})
            .then(() => res.redirect('back'))
            .catch(next);
          break;
        case 'deleteforce':
           Course.deleteMany({_id:{$in :req.body.courseIds}})
            .then(() => res.redirect('back'))
            .catch(next);
          break;
        default:
          res.json({message:"Hành động không hợp lệ"})
      }
  }

  // [DELETE] /course/:id
  delete(req,res,next){
     Course.delete({_id:req.params.id})
        .then(()=> res.redirect('back'))
        .catch(next)
  }

   // [DELETE] /course/:id/force
  forceDelete(req,res,next){
     Course.deleteOne({_id:req.params.id})
        .then(()=> res.redirect('back'))
        .catch(next)
  }
}

module.exports = new CourseController();
