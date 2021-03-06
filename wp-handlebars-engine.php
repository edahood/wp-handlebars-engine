<?php
/*
 * Plugin Name: WordPress Handlebars Engine
 * Plugin URI: https://github.com/edahood/wp-handlebars-engine
 * Description: Renders Handlebars templates within your WordPress Theme/Plugin.
 * Version: 0.0.1
 * Author: Eliot Dahood
 * Author URI: http://mbt.wien
 * Copyright: Eliot Dahood
 * Text Domain: hbs
*/

namespace HBE {
	define( __NAMESPACE__ . '_ENGINE_DIR', __DIR__ . DIRECTORY_SEPARATOR );
}

namespace {
	use HBE\Engine\Handlebars;

	if (file_exists('vendor/autoload.php')) {
		require "vendor/autoload.php";
	}

	if (!function_exists('get_hbs_template')) {
		/**
		 * @param string $template
		 * @param array $data
		 * @param bool $templateDir
		 * @param bool $cacheDir
		 * @return bool
		 */
		function get_hbs_template($template, $data, $templateDir = false, $cacheDir = false) {
			return Handlebars::render($template, $data, false, $templateDir, $cacheDir);
		}
	}

	if (!function_exists('the_hbs_template')) {
		/**
		 * @param string $template
		 * @param array $data
		 * @param bool $templateDir
		 * @param bool $cacheDir
		 * @return bool
		 */
		function the_hbs_template($template, $data, $templateDir = false, $cacheDir = false) {
			Handlebars::render($template, $data, true, $templateDir, $cacheDir);
		}
	}

	use HBE\Admin\AdminInit;
	AdminInit::init();
}


