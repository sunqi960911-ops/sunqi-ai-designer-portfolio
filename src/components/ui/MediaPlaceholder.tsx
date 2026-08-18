interface MediaPlaceholderProps { label?: string; className?: string; image?: string }

export function MediaPlaceholder({ label = 'IMAGE / VIDEO PLACEHOLDER', className = '', image }: MediaPlaceholderProps) {
  return (
    <div className={`media-placeholder ${className}`}>
      {image && <img className="media-placeholder-image" src={image} alt="" loading="lazy" decoding="async" />}
      <div className="media-grid" />
      <span>{label}</span>
    </div>
  )
}
