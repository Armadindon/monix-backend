/**
 * A set of functions called "actions" for `auth-code`
 */

export default {
  generateCode: async (ctx) => {
    // On récupère le user courant (TODO: Gérer les requetes pour un autre utilisateur) et le produit actuel
    const user = ctx.state.user;

    let codeExist = false;
    let tries = 0;
    let code = "";

    // On essaie de créer le code (on limite le nombre d'essais a 20 pour éviter les boucles infinies)
    while (!codeExist && tries < 20) {
      code = Math.floor(Math.random() * 1001)
        .toString()
        .padStart(4, "0");

      const users_with_code = await strapi.entityService.findMany(
        "plugin::users-permissions.user",
        {
          fields: ["private_code"],
          filters: { private_code: code },
        }
      );

      codeExist = users_with_code.length !== 0;
      tries++;
    }

    if (codeExist) {
      ctx.response.status = 500;
      ctx.response.body = {
        error: "Unable to create code for user",
      };
      return;
    }

    strapi.entityService.update("plugin::users-permissions.user", user.id, {
      data: { private_code: code },
    });

    ctx.response.status = 200;
    ctx.response.body = {
      code: code,
    };
  },
};
