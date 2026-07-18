export default function PageWrapper({ children, className = '' }) {
  return (
    <div className={`relative min-h-screen overflow-x-hidden pb-safe-nav pt-10 md:pt-14 ${className}`}>
      {children}
    </div>
  );
}
