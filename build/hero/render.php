<?php
$option = $attributes['option'] ?? 'image';
$media_url = esc_url( $attributes['mediaUrl'] ?? '' );
$video_url = esc_url( $attributes['videoUrl'] ?? '' );
$heading = wp_kses_post( $attributes['heading'] ?? '' );
$dark = ! empty( $attributes['darkOverlay'] );
?>
<section class="parsnip-hero alignfull relative h-screen w-full flex items-center justify-center px-6 overflow-hidden">
	<?php if ( $option === 'image' && $media_url ) : ?>
		<span class="absolute inset-0 w-full h-full bg-cover bg-center" style="background-image:url('<?php echo $media_url; ?>');"></span>
	<?php elseif ( $option === 'video' && $video_url ) : ?>
		<video class="absolute inset-0 w-full h-full object-cover" src="<?php echo $video_url; ?>" autoplay loop muted playsinline></video>
	<?php endif; ?>
	<?php if ( $dark ) : ?>
		<span class="absolute inset-0 bg-black/40"></span>
	<?php endif; ?>
	<h1 class="absolute bottom-12 left-12 z-10 text-white text-5xl md:text-7xl"><?php echo $heading; ?></h1>
</section>
