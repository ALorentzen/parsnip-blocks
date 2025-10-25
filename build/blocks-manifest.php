<?php
// This file is generated. Do not modify it manually.
return array(
	'gallery' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'parsnip-blocks/gallery',
		'version' => '0.1.0',
		'title' => 'Gallery',
		'category' => 'widgets',
		'icon' => 'smiley',
		'description' => 'Example block scaffolded with Create Block tool.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'parsnip-blocks',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js'
	),
	'hero' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'parsnip-blocks/hero',
		'title' => 'Hero',
		'category' => 'design',
		'icon' => 'cover-image',
		'supports' => array(
			'html' => false,
			'align' => array(
				'full'
			),
			'color' => array(
				'text' => true
			),
			'background' => array(
				'color' => true,
				'gradient' => true,
				'fontSize' => false
			)
		),
		'attributes' => array(
			'option' => array(
				'type' => 'string',
				'default' => 'image'
			),
			'mediaId' => array(
				'type' => 'number',
				'default' => 0
			),
			'mediaUrl' => array(
				'type' => 'string',
				'default' => ''
			),
			'heading' => array(
				'type' => 'string',
				'default' => ''
			),
			'videoUrl' => array(
				'type' => 'string',
				'default' => ''
			),
			'videoUrlType' => array(
				'type' => 'string',
				'default' => 'mp4'
			),
			'darkOverlay' => array(
				'type' => 'boolean',
				'default' => true
			)
		),
		'editorScript' => 'file:./index.js',
		'render' => 'file:./render.php',
		'style' => 'parsnip-blocks-shared'
	),
	'quote' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'parsnip-blocks/quote',
		'version' => '0.1.0',
		'title' => 'Quote',
		'category' => 'widgets',
		'icon' => 'smiley',
		'description' => 'Example block scaffolded with Create Block tool.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'parsnip-blocks',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js'
	)
);
