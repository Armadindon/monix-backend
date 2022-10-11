import _ from "lodash";

export default (plugin) => {

  // Create the new controller
  plugin.controllers.user.updateMe = async (ctx) => {
    const user = ctx.state.user;

    // https://forum.strapi.io/t/how-to-check-user-info-and-update-it-after-file-upload/3302/2
    // User has to be logged in to update themselves
    if (!user) {
      return ctx.unauthorized();
    }

    // Pick only specific fields for security
    const newData = _.pick(ctx.request.body, ["email", "username", "avatar"]);

    // Make sure there is no duplicate user with the same username
    if (newData.username) {
      const userWithSameUsername = await strapi
        .query("plugin::users-permissions.user")
        .findOne({ where: { username: newData.username } });

      if (userWithSameUsername && userWithSameUsername.id != user.id) {
        return ctx.badRequest("Username already taken");
      }
    }

    // Make sure there is no duplicate user with the same email
    if (newData.email) {
      const userWithSameEmail = await strapi
        .query("plugin::users-permissions.user")
        .findOne({ where: { email: newData.email.toLowerCase() } });

      if (userWithSameEmail && userWithSameEmail.id != user.id) {
        return ctx.badRequest("Email already taken");
      }
      newData.email = newData.email.toLowerCase();
    }

    // Make sure that the image exist in the uploads
    let avatarToDelete;
    if (newData.avatar) {
      const image = await strapi.entityService.findOne(
        "plugin::upload.file",
        newData.avatar
      );
      if (!image) return ctx.badRequest("Image Id not found");

      const fullUser = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        user.id,
        { populate: ["avatar"] }
      );
      if (fullUser.avatar) {
        avatarToDelete = fullUser.avatar.id;
      }
    }

    const result = await strapi.entityService.update(
      "plugin::users-permissions.user",
      user.id,
      { data: newData, populate: ["avatar"] }
    );
    if (avatarToDelete) {
      const file = await strapi.plugins["upload"].services.upload.findOne(
        avatarToDelete
      );
      await strapi.plugins["upload"].services.upload.remove(file);
    }

    // We delete private fields
    delete result.confirmationToken;
    delete result.password;
    delete result.resetPasswordToken;

    return result;
  };

  // Add the custom route
  plugin.routes["content-api"].routes.unshift({
    method: "POST",
    path: "/users/me",
    handler: "user.updateMe",
    config: {
      prefix: "",
    },
  });

  return plugin;
};
