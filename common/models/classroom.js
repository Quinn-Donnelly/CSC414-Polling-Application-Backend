'use strict';

// TODO: Add the teacherId for the class
module.exports = function(Classroom) {
  Classroom.beforeRemote('create', (context, classroom, next) => {
    context.args.data.teacherId = context.req.accessToken.userId;
    next();
  });

/*
  Classroom.shortToClassroomId = function(shortid, cb) {
    cb(null, 'What');
  };

  Classroom.remoteMethod('shortid', {
    accepts: {arg: 'shortid', type: 'string'},
    returns: {arg: 'id', type: 'string'},
  });
  */

  Classroom.shortid = function(shortid, cb) {
    Classroom.find({where: {shortid: shortid}}, (err, data) => {
      console.log(data[0].id);
      cb(null, `${data[0].id}`);
    });
  };

  Classroom.remoteMethod('shortid', {
    accepts: {arg: 'shortid', type: 'string'},
    returns: {arg: 'classroomId', type: 'string'},
  });
};
