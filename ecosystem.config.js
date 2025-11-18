// ecosystem.config.js
require('dotenv').config();

module.exports = {
  apps: [
    {
      name: "socios-app",
      script: "app.js",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "development",
        PORT: process.env.PORT || 3000
      },
      env_production: {
        NODE_ENV: "production",
        PORT: process.env.PORT || 3000
      },
      out_file: "./logs/socios-app-out.log",
      error_file: "./logs/socios-app-err.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss"
    }
  ]
};

