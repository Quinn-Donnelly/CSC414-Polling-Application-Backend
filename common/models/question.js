'use strict';

module.exports = function(Question) {
  Question.beforeRemote('create', (context, classroom, next) => {
    context.args.data.teacherId = context.req.accessToken.userId;
    console.log(context.req);
    next();
  });
};
