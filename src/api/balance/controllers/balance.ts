/**
 * A set of functions called "actions" for `balance`
 */

export default {
  buyProduct: async (ctx, next) => {
    const requestData = ctx.request.body;

    if (!requestData || !requestData.product || !requestData.amount) {
      ctx.response.status = 400;
      ctx.response.body = {
        error:
          "You must specify the product id (with 'product' field) and the amount (with 'amount' field)",
      };
      return;
    }

    const { product, amount } = requestData;

    // On récupère le user courant (TODO: Gérer les requetes pour un autre utilisateur) et le produit actuel
    const user = ctx.state.user;
    const productEntity = await strapi.entityService.findOne("api::product.product", product);
    //On vérifie quelques informations avant d'enregistrer le changement
    if (!productEntity) {
      ctx.response.status = 404;
      ctx.response.body = {
        error: "Product not found",
      };
      return;
    }

    if (amount > productEntity.stock) {
      ctx.response.status = 400;
      ctx.response.body = {
        error: "Specified amount is superior to available stock",
      };
      return;
    }

    if (amount <= 0) {
      ctx.response.status = 400;
      ctx.response.body = {
        error: "Specified amount must be positive",
      };
      return;
    }

    //On enregistre le nombre de stock et le nombre de crédits de l'user
    strapi.entityService.update("api::product.product", product, {
      data: { stock: productEntity.stock - amount },
    });
    strapi.entityService.update("plugin::users-permissions.user", user.id, {
      data: { balance: user.balance - (amount * productEntity.price) },
    });

    ctx.response.status = 200;
    strapi.entityService.create("api::history.history", {
      data: { 
        user: user.id,
        product: product,
        movement: -productEntity.price * amount,
        description: `Achat ${productEntity.name} x ${amount}`
       },
    });
  },
  creditAccount: async (ctx, next) => {
    const requestData = ctx.request.body;

    if (!requestData || !requestData.amount) {
      ctx.response.status = 400;
      ctx.response.body = {
        error:
          "You must specify the amount (with 'amount' field)",
      };
      return;
    }

    const { amount } = requestData;

    // On récupère le user courant
    const user = ctx.state.user;

    if (amount <= 0) {
      ctx.response.status = 400;
      ctx.response.body = {
        error: "Specified amount must be positive",
      };
      return;
    }

    // Le premier qui met plus de 50 balles dans monix je le défonce de toute manière
    if (amount > 100) {
      ctx.response.status = 400;
      ctx.response.body = {
        error: "Specified amount is too big",
      };
      return;
    }

    //On enregistre le nombre de stock et le nombre de crédits de l'user
    strapi.entityService.update("plugin::users-permissions.user", user.id, {
      data: { balance: user.balance + amount },
    });

    ctx.response.status = 200;
    strapi.entityService.create("api::history.history", {
      data: { 
        user: user.id,
        movement: amount,
        description: `Rechargement ${amount} crédits`,
        date: new Date().toISOString()
       },
    });
  },
};
