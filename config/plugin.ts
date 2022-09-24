module.exports = ({ env }) => ({
  upload: {
    config: {
      providerOptions: {
        sizeLimit: 250 * 1024 * 1024, // 256mb in bytes
      },
    },
  },
  email: {
    provider: "smtp",
    providerOptions: {
      host: env("SMTP_SERVER"), //SMTP Host
      port: env("SMTP_PORT"), //SMTP Port
      secure: true,
      username: env("MAIL_ADDRESS"),
      password: env("MAIL_PASSWORD"),
      rejectUnauthorized: true,
      requireTLS: true,
      connectionTimeout: 1,
    },
  },
});
