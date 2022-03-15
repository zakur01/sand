module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '33d90004b637ab8a1788137d1b809cc6'),
  },
});
