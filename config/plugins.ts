module.exports = ({ env }) => {
  return {
    email: {
      config: {
        provider: "nodemailer",
        providerOptions: {
          host: env("SMTP_SERVER"), //SMTP Host
          port: env("SMTP_PORT"), //SMTP Port
          auth: {
            user: env("MAIL_ADDRESS"),
            pass: env("MAIL_PASSWORD"),
          },
        },
        settings: {
          defaultFrom: env("MAIL_ADDRESS"),
          defaultReplyTo: env("MAIL_ADDRESS"),
        },
      },
    },
  };
};
