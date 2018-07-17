const maxMemory = process.env.WEB_MEMORY || 80;
const nodeEnv = process.env.NODE_ENV || 'development';

module.exports = {
  apps: [
    {
      name: 'web',
      script: 'node server.js',
      node_args: [
        '--optimize_for_size', '--max_old_space_size=400', '--gc_interval=100',
      ],
      log_file: "combined.outerr.log",
      out_file: "out.log",
      error_file: "err.log",
      instances: process.env.WEB_CONCURRENCY || -1,
      exec_mode: 'cluster',
      max_memory_restart: `${maxMemory}M`,
      env: {
        PORT: process.env.PORT || 3000,
        NODE_ENV: nodeEnv,
      },
    },
  ],
};
