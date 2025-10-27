import { __ } from "@wordpress/i18n";
import {
	useBlockProps,
	MediaUpload,
	InspectorControls,
	RichText,
} from "@wordpress/block-editor";
import {
	PanelBody,
	ToggleControl,
	Button,
	SelectControl,
} from "@wordpress/components";
import { Fragment } from "@wordpress/element";

export default function Edit({ attributes, setAttributes }) {
	const { videoId, videoUrl, mediaId, mediaUrl, heading, darkOverlay } =
		attributes ?? {};
	const props = useBlockProps({
		className:
			"parsnip-hero relative min-h-[60vh] w-full border border-solid border-gray-200 mb-8 overflow-hidden",
		// Only apply background image if option is 'image' (for fallback, but not needed with absolute img)
		style: {},
	});

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title={__("Hero", "parsnip-blocks")}>
					<SelectControl
						label="Display Option"
						value={attributes.option}
						options={[
							{ label: "Image", value: "image" },
							{ label: "Video", value: "video" },
						]}
						onChange={(value) => setAttributes({ option: value })}
					/>
					{attributes.option === "image" && (
						<MediaUpload
							onSelect={(m) =>
								setAttributes({ mediaId: m.id, mediaUrl: m.url })
							}
							value={mediaId}
							render={({ open }) => (
								<div className="space-y-3">
									{mediaUrl && (
										<img
											src={mediaUrl}
											alt=""
											style={{ width: "100%", height: "auto", borderRadius: 6 }}
										/>
									)}
									<div className="flex gap-8">
										<Button variant="secondary" onClick={open}>
											{mediaUrl
												? __("Replace image", "parsnip-blocks")
												: __("Choose image", "parsnip-blocks")}
										</Button>
										{mediaUrl && (
											<Button
												variant="link"
												isDestructive
												onClick={() =>
													setAttributes({ mediaId: 0, mediaUrl: "" })
												}
											>
												{__("Remove", "parsnip-blocks")}
											</Button>
										)}
									</div>
								</div>
							)}
						/>
					)}
					{attributes.option === "video" && (
						<MediaUpload
							onSelect={(m) =>
								setAttributes({ videoId: m.id, videoUrl: m.url })
							}
							value={videoId}
							render={({ open }) => (
								<div className="space-y-3">
									{videoUrl && (
										<video
											src={videoUrl}
											controls
											style={{ width: "100%", height: "auto", borderRadius: 6 }}
										/>
									)}
									<div className="flex gap-8">
										<Button variant="secondary" onClick={open}>
											{videoUrl
												? __("Replace video", "parsnip-blocks")
												: __("Choose video", "parsnip-blocks")}
										</Button>
										{videoUrl && (
											<Button
												variant="link"
												isDestructive
												onClick={() =>
													setAttributes({ videoId: 0, videoUrl: "" })
												}
											>
												{__("Remove", "parsnip-blocks")}
											</Button>
										)}
									</div>
								</div>
							)}
						/>
					)}
					<ToggleControl
						__nextHasNoMarginBottom
						label={__("Dark overlay", "parsnip-blocks")}
						checked={!!darkOverlay}
						onChange={(v) => setAttributes({ darkOverlay: v })}
					/>
				</PanelBody>
			</InspectorControls>

			<section {...props}>
				{!!darkOverlay && (
					<span className="parsnip-hero__shade absolute inset-0 bg-black/40 pointer-events-none" />
				)}
				{/* Show image or video preview in canvas, but not the selector */}
				{attributes.option === "image" && mediaUrl && (
					<img
						src={mediaUrl}
						alt=""
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
							position: "absolute",
							inset: 0,
							zIndex: 0,
						}}
					/>
				)}
				{attributes.option === "video" && videoUrl && (
					<video
						src={videoUrl}
						controls
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
							position: "absolute",
							inset: 0,
							zIndex: 0,
						}}
					/>
				)}
				<RichText
					tagName="h1"
					className="z-10 font-bold leading-tight text-6xl md:text-9xl absolute bottom-12 left-8 text-white drop-shadow-lg"
					value={heading}
					onChange={(v) => setAttributes({ heading: v })}
					placeholder={__("Add heading…", "parsnip-blocks")}
					allowedFormats={["core/bold", "core/italic"]}
				/>
			</section>
		</Fragment>
	);
}
