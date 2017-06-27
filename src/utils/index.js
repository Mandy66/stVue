export function deployConfig(el, config) {
    _.isObject(config) ? Object.keys(config).forEach((key) => {
        el.setAttribute(key, config[key]);
    }) : null;
}
