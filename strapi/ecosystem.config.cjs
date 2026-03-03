/**
 * PM2 ecosystem config — Strapi CMS
 *
 * Usage:
 *   pm2 start ecosystem.config.cjs --env production
 *   pm2 save
 *   pm2 startup   # follow instructions to enable on server reboot
 *
 * Adjust `cwd` to match your server path.
 */
module.exports = {
  apps: [
    {
      name: 'rnb-strapi',
      cwd: '/var/www/vhosts/thernbclinic.com/rnb-clinic/strapi',
      script: 'npm',
      args: 'run start',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: '1337',
        HOST: '0.0.0.0',
      },
      error_file: '/var/log/pm2/rnb-strapi-error.log',
      out_file: '/var/log/pm2/rnb-strapi-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
}
