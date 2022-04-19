module.exports = (plugin) => {
  const sanitizeOutput = (user) => {
    const {
      password,
      resetPasswordToken,
      confirmationToken,
      ...sanitizedUser
    } = user; // be careful, you need to omit other private attributes yourself
    return sanitizedUser;
  };

  plugin.controllers.user.me = async (ctx) => {
    if (!ctx.state.user) {
      return ctx.unauthorized();
    }
    console.log(ctx.request.body);
    const user = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      ctx.state.user.id,
      { populate: ["avatar"] }
    );

    ctx.body = sanitizeOutput(user);
  };

  plugin.controllers.user.find = async (ctx) => {
    const users = await strapi.entityService.findMany(
      "plugin::users-permissions.user",
      { ...ctx.params, populate: ["avatar"] }
    );

    ctx.body = users.map((user) => sanitizeOutput(user));
  };

  plugin.controllers.auth.refreshToken = async (ctx) => {
    // refresh userself token
    // const newJwt = strapi.plugins["users-permissions"].services.jwt.issue({
    //   id: ctx.state.user.id,
    // });
    // return { jwt: newJwt };

    // comment out next lines, and refresh the request body's token like {token: 'xxx'}
    const { token } = ctx.request.body;
    const payload =
      strapi.plugins["users-permissions"].services.jwt.verify(token);
    const newJwt = strapi.plugins["users-permissions"].services.jwt.issue({
      id: payload.id,
    });
    return { jwt: newJwt };
  };

  plugin.routes["content-api"].routes.push({
    method: "POST",
    path: "/auth/refreshToken",
    handler: "auth.refreshToken",
    config: {
      prefix: "",
    },
  });

  return plugin;
};
