'use strict';

// TODO: Add the teacherId for the class
module.exports = function(Classroom) {
  Classroom.beforeRemote('create', (context, classroom, next) => {
    context.args.data.teacherId = context.req.accessToken.userId;
    next();
  });
};
