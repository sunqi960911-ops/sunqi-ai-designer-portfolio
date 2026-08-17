interface MediaPlaceholderProps { label?: string; className?: string; image?: string }

export function MediaPlaceholder({ label = 'IMAGE / VIDEO PLACEHOLDER', className = '', image }: MediaPlaceholderProps) {
  return (
    <div className={`media-placeholder ${className}`} style={image ? { backgroundImage: `url(${image})` } : undefined}>
      <div className="media-grid" />
      <span>{label}</span>
    </div>
  )
}
