module.exports = {
  apps : [{
    script: 'main.js',
    name: 'infrared3011',
    watch: '.',
    ignore_watch : ["node_modules", "public"],
    env: {
      "PORT": 3011,
    },
  },],

  
  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
