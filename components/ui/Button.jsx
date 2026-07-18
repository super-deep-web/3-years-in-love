import Link from 'next/link';

export default function Button({
  href,
  onClick,
  children,
  variant = 'solid',
  icon: Icon,
  className = '',
  type = 'button',
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-body font-semibold text-sm tracking-wide transition-all duration-200 active:scale-95 select-none';

  const variants = {
    solid: 'bg-coral text-cream shadow-glass hover:bg-peach hover:shadow-lg',
    outline: 'border-2 border-coral text-coral hover:bg-coral hover:text-cream',
    ghost: 'text-ink hover:bg-ivory',
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {Icon && <Icon size={18} strokeWidth={2.2} />}
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {Icon && <Icon size={18} strokeWidth={2.2} />}
      {children}
    </button>
  );
}
