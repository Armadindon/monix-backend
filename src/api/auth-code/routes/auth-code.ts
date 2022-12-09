export default {
  routes: [
    {
      method: "POST",
      path: "/generate-code",
      handler: "auth-code.generateCode",
    },
  ],
};
