const {removeModuleScopePlugin, addExternalBabelPlugins, override } = require('customize-cra');

// https://stackoverflow.com/a/55298684
// module.exports = function override(config, env) {
//     if (!config.plugins) {
//         config.plugins = [];
//     }
//     removeModuleScopePlugin()(config);
//     addBabelPlugin(["@babel/plugin-proposal-private-methods", { "loose": true }])(config)

//     // config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));
//     // config.resolve.plugins = [...config.resolve.plugins, ["@babel/plugin-proposal-private-methods", { "loose": true }]]
//     return config;
// };


module.exports = override(
    removeModuleScopePlugin(),
    addExternalBabelPlugins(["@babel/plugin-proposal-class-properties", { "loose": true }], ["@babel/plugin-proposal-private-methods", { "loose": true }])
    )
