"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerPlugin = registerPlugin;
exports.unregisterPlugin = unregisterPlugin;
exports.getPlugin = getPlugin;
exports.getPlugins = getPlugins;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _hooks = require("@wordpress/hooks");

var _icons = require("@wordpress/icons");

var _lodash = require("lodash");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

/**
 * Defined behavior of a plugin type.
 *
 * @typedef {Object} WPPlugin
 *
 * @property {string}                    name   A string identifying the plugin. Must be
 *                                              unique across all registered plugins.
 *                                              unique across all registered plugins.
 * @property {string|WPElement|Function} icon   An icon to be shown in the UI. It can
 *                                              be a slug of the Dashicon, or an element
 *                                              (or function returning an element) if you
 *                                              choose to render your own SVG.
 * @property {Function}                  render A component containing the UI elements
 *                                              to be rendered.
 */

/**
 * Plugin definitions keyed by plugin name.
 *
 * @type {Object.<string,WPPlugin>}
 */
var plugins = {};
/**
 * Registers a plugin to the editor.
 *
 * @param {string}   name     A string identifying the plugin.Must be
 *                            unique across all registered plugins.
 * @param {WPPlugin} settings The settings for this plugin.
 *
 * @example
 * <caption>ES5</caption>
 * ```js
 * // Using ES5 syntax
 * var el = wp.element.createElement;
 * var Fragment = wp.element.Fragment;
 * var PluginSidebar = wp.editPost.PluginSidebar;
 * var PluginSidebarMoreMenuItem = wp.editPost.PluginSidebarMoreMenuItem;
 * var registerPlugin = wp.plugins.registerPlugin;
 * var moreIcon = wp.element.createElement( 'svg' ); //... svg element.
 *
 * function Component() {
 * 	return el(
 * 		Fragment,
 * 		{},
 * 		el(
 * 			PluginSidebarMoreMenuItem,
 * 			{
 * 				target: 'sidebar-name',
 * 			},
 * 			'My Sidebar'
 * 		),
 * 		el(
 * 			PluginSidebar,
 * 			{
 * 				name: 'sidebar-name',
 * 				title: 'My Sidebar',
 * 			},
 * 			'Content of the sidebar'
 * 		)
 * 	);
 * }
 * registerPlugin( 'plugin-name', {
 * 	icon: moreIcon,
 * 	render: Component,
 * } );
 * ```
 *
 * @example
 * <caption>ESNext</caption>
 * ```js
 * // Using ESNext syntax
 * import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post';
 * import { registerPlugin } from '@wordpress/plugins';
 * import { more } from '@wordpress/icons';
 *
 * const Component = () => (
 * 	<>
 * 		<PluginSidebarMoreMenuItem
 * 			target="sidebar-name"
 * 		>
 * 			My Sidebar
 * 		</PluginSidebarMoreMenuItem>
 * 		<PluginSidebar
 * 			name="sidebar-name"
 * 			title="My Sidebar"
 * 		>
 * 			Content of the sidebar
 * 		</PluginSidebar>
 * 	</>
 * );
 *
 * registerPlugin( 'plugin-name', {
 * 	icon: more,
 * 	render: Component,
 * } );
 * ```
 *
 * @return {WPPlugin} The final plugin settings object.
 */

function registerPlugin(name, settings) {
  if ((0, _typeof2.default)(settings) !== 'object') {
    console.error('No settings object provided!');
    return null;
  }

  if (typeof name !== 'string') {
    console.error('Plugin names must be strings.');
    return null;
  }

  if (!/^[a-z][a-z0-9-]*$/.test(name)) {
    console.error('Plugin names must include only lowercase alphanumeric characters or dashes, and start with a letter. Example: "my-plugin".');
    return null;
  }

  if (plugins[name]) {
    console.error("Plugin \"".concat(name, "\" is already registered."));
  }

  settings = (0, _hooks.applyFilters)('plugins.registerPlugin', settings, name);

  if (!(0, _lodash.isFunction)(settings.render)) {
    console.error('The "render" property must be specified and must be a valid function.');
    return null;
  }

  plugins[name] = _objectSpread({
    name: name,
    icon: _icons.plugins
  }, settings);
  (0, _hooks.doAction)('plugins.pluginRegistered', settings, name);
  return settings;
}
/**
 * Unregisters a plugin by name.
 *
 * @param {string} name Plugin name.
 *
 * @example
 * <caption>ES5</caption>
 * ```js
 * // Using ES5 syntax
 * var unregisterPlugin = wp.plugins.unregisterPlugin;
 *
 * unregisterPlugin( 'plugin-name' );
 * ```
 *
 * @example
 * <caption>ESNext</caption>
 * ```js
 * // Using ESNext syntax
 * const { unregisterPlugin } = wp.plugins;
 *
 * unregisterPlugin( 'plugin-name' );
 * ```
 *
 * @return {?WPPlugin} The previous plugin settings object, if it has been
 *                     successfully unregistered; otherwise `undefined`.
 */


function unregisterPlugin(name) {
  if (!plugins[name]) {
    console.error('Plugin "' + name + '" is not registered.');
    return;
  }

  var oldPlugin = plugins[name];
  delete plugins[name];
  (0, _hooks.doAction)('plugins.pluginUnregistered', oldPlugin, name);
  return oldPlugin;
}
/**
 * Returns a registered plugin settings.
 *
 * @param {string} name Plugin name.
 *
 * @return {?WPPlugin} Plugin setting.
 */


function getPlugin(name) {
  return plugins[name];
}
/**
 * Returns all registered plugins.
 *
 * @return {WPPlugin[]} Plugin settings.
 */


function getPlugins() {
  return Object.values(plugins);
}
//# sourceMappingURL=index.js.map