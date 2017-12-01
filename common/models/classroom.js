'use strict';

// TODO: Add the teacherId for the class
module.exports = function(Classroom) {
  Classroom.beforeRemote('create', (context, classroom, next) => {
    context.args.data.teacherId = context.req.accessToken.userId;
    next();
  });

  Classroom.shortid = function(shortid, cb) {
    Classroom.find({where: {shortid: shortid}}, (err, data) => {
      cb(null, `${data[0].id}`);
    });
  };

  Classroom.remoteMethod('shortid', {
    accepts: {arg: 'shortid', type: 'string'},
    returns: {arg: 'classroomId', type: 'string'},
  });
};
