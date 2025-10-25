import { __ } from "@wordpress/i18n";
import { useBlockProps, MediaUpload, InspectorControls, RichText } from "@wordpress/block-editor";
import { PanelBody, ToggleControl, Button, SelectControl } from "@wordpress/components";
import { Fragment } from "@wordpress/element";

export default function Edit({ attributes, setAttributes }) {
  const { videoId, videoUrl, mediaId, mediaUrl, heading, darkOverlay } = attributes ?? {};
  const props = useBlockProps({
    className: "parsnip-hero relative min-h-[60vh] bg-cover bg-center flex items-center justify-center px-6 w-full",
    style: mediaUrl ? { backgroundImage: `url(${mediaUrl})` } : {},
  });

  return (
    <Fragment>
      <InspectorControls>
        <PanelBody title={__("Hero","parsnip-blocks")}> 
          <SelectControl
            label="Display Option"
            value={attributes.option}
            options={[
              { label: 'Image', value: 'image' },
              { label: 'Video', value: 'video' }
            ]}
            onChange={(value) => setAttributes({ option: value })}
          />
          {attributes.option === 'image' && (
            <MediaUpload onSelect={(m)=>setAttributes({ mediaId:m.id, mediaUrl:m.url })} value={mediaId}
              render={({open})=>(
                <div className="space-y-3">
                  {mediaUrl && <img src={mediaUrl} alt="" style={{width:"100%",height:"auto",borderRadius:6}}/>}
                  <div className="flex gap-8">
                    <Button variant="secondary" onClick={open}>{mediaUrl?__("Replace image","parsnip-blocks"):__("Choose image","parsnip-blocks")}</Button>
                    {mediaUrl && <Button variant="link" isDestructive onClick={()=>setAttributes({ mediaId:0, mediaUrl:"" })}>{__("Remove","parsnip-blocks")}</Button>}
                  </div>
                </div>)}/>
          )}
          {attributes.option === 'video' && (
            <MediaUpload onSelect={(m)=>setAttributes({ videoId:m.id, videoUrl:m.url })} value={videoId}
              render={({open})=>(
                <div className="space-y-3">
                  {videoUrl && <video src={videoUrl} controls style={{width:"100%",height:"auto",borderRadius:6}}/>}
                  <div className="flex gap-8">
                    <Button variant="secondary" onClick={open}>{videoUrl?__("Replace video","parsnip-blocks"):__("Choose video","parsnip-blocks")}</Button>
                    {videoUrl && <Button variant="link" isDestructive onClick={()=>setAttributes({ videoId:0, videoUrl:"" })}>{__("Remove","parsnip-blocks")}</Button>}
                  </div>
                </div>)}/>
          )}
          <ToggleControl __nextHasNoMarginBottom label={__("Dark overlay","parsnip-blocks")} checked={!!darkOverlay} onChange={(v)=>setAttributes({ darkOverlay:v })}/>
        </PanelBody>
      </InspectorControls>

      <section {...props}>
        {!!darkOverlay && <span className="parsnip-hero__shade absolute inset-0 bg-black/40 pointer-events-none" />}
        {/* Show image or video preview in canvas, but not the selector */}
        {attributes.option === 'image' && mediaUrl && (
          <img src={mediaUrl} alt="" style={{width:"100%",height:"auto",borderRadius:6, position:'absolute', zIndex:0, inset:0, objectFit:'cover'}} />
        )}
        {attributes.option === 'video' && videoUrl && (
          <video src={videoUrl} controls style={{width:"100%",height:"auto",borderRadius:6, position:'absolute', zIndex:0, inset:0, objectFit:'cover'}} />
        )}
        <RichText tagName="h1" className="z-10 font-bold leading-tight text-center text-6xl md:text-9xl"
          value={heading} onChange={(v)=>setAttributes({ heading:v })} placeholder={__("Add heading…","parsnip-blocks")}
          allowedFormats={["core/bold","core/italic"]}/>
      </section>
    </Fragment>
  );
}
