const path = require('path');
const webpack = require('webpack');

const { getConfig } = require('./config');

const build = () => {

  const config = getConfig();
  const compiler = webpack(config);

  compiler.run((err, stats) => {
    if (err) throw err;

    compiler.close((e) => {
      if (e) throw e;
      console.log(stats);
    });
  });
};

build();