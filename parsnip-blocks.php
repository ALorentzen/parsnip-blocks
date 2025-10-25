<?php
/**
 * Plugin Name:       Parsnip Blocks
 * Description:       Example block scaffolded with Create Block tool.
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       parsnip-blocks
 *
 * @package ParsnipBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * (Optional reference) New metadata collection APIs in WP 6.7/6.8.
 * Kept from your original file for future use.
 * https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
 * https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 */
function parsnip_blocks_parsnip_blocks_block_init() {
	if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
		wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
		return;
	}
	if ( function_exists( 'wp_register_block_metadata_collection' ) ) {
		wp_register_block_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
	}
	$manifest_data = require __DIR__ . '/build/blocks-manifest.php';
	foreach ( array_keys( $manifest_data ) as $block_type ) {
		register_block_type( __DIR__ . "/build/{$block_type}" );
	}
}

/**
 * Register shared Tailwind styles (front + editor) and blocks.
 */
add_action( 'init', function () {
	$base = plugin_dir_url( __FILE__ ) . 'build/';

	// Tailwind bundles you build:
	wp_register_style( 'parsnip-blocks-shared', $base . 'shared.css', [], '0.1.0' );
	wp_register_style( 'parsnip-blocks-editor', $base . 'shared-editor.css', [ 'wp-edit-blocks' ], '0.1.0' ); // ensure editor order

	// Register blocks (built folders).
	foreach ( [ 'hero', 'gallery', 'quote' ] as $slug ) {
		register_block_type( __DIR__ . "/build/{$slug}" );
	}
}, 5 );

/**
 * Ensure all Parsnip blocks get Tailwind inside the editor iframe.
 * Uses server-side filter so args propagate with higher priority. 
 * Docs: register_block_type_args. 
 */
add_filter( 'register_block_type_args', function ( array $args, string $name ) {
	if ( strpos( $name, 'parsnip-blocks/' ) === 0 ) {
		$args['style']        = 'parsnip-blocks-shared';
		$args['editor_style'] = 'parsnip-blocks-editor';
	}
	return $args;
}, 10, 2 );

/**
 * FRONT: Tailwind-only — remove core block CSS & Global Styles.
 * Also stop theme.json inline/global CSS output.
 */
add_action( 'wp_enqueue_scripts', function () {
	wp_dequeue_style( 'wp-block-library' );
	wp_dequeue_style( 'wp-block-library-theme' );
	wp_dequeue_style( 'classic-theme-styles' );
	wp_dequeue_style( 'global-styles' ); // stylesheet handle
	remove_action( 'wp_enqueue_scripts', 'wp_enqueue_global_styles' ); // stops global-styles-inline-css
	remove_action( 'wp_body_open', 'wp_global_styles_render_svg_filters' );
}, 100 );
