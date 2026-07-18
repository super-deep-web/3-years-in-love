export default function Blob({
  className = '',
  size = 300,
  color = 'bg-apricot',
  blur = 'blur-3xl',
  opacity = 'opacity-60',
  animate = 'animate-float',
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full ${color} ${blur} ${opacity} ${animate} ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
