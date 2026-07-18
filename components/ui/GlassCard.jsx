export default function GlassCard({ children, className = '', as: Tag = 'div', strong = false }) {
  return (
    <Tag
      className={`${strong ? 'glass-strong' : 'glass'} rounded-3xl shadow-glass ${className}`}
    >
      {children}
    </Tag>
  );
}
