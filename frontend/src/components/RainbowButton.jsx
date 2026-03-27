import { Link } from 'react-router-dom';

export default function RainbowButton({ 
  children, 
  as = "button", 
  href, 
  to, 
  className = "",
  innerClassName = "",
  onClick, 
  ...props 
}) {
  const content = (
    <>
      <span className="pointer-events-none absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#fcd34d_0%,#d97706_50%,#fcd34d_100%)]" />
      <span className={`inline-flex flex-grow h-full w-full cursor-pointer items-center justify-center rounded-xl bg-[#0a0e1a] px-6 py-3 font-semibold text-white backdrop-blur-3xl transition-all duration-300 hover:bg-[#111827] ${innerClassName}`}>
        {children}
      </span>
    </>
  );

  const baseClasses = `relative inline-flex overflow-hidden rounded-xl p-[2px] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-[#0a0e1a] group hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all duration-300 active:scale-95 ${className}`;

  if (as === "Link" && to) {
    return (
      <Link to={to} className={baseClasses} onClick={onClick} {...props}>
        {content}
      </Link>
    );
  }

  if (as === "a" && href) {
    return (
      <a href={href} className={baseClasses} onClick={onClick} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button className={baseClasses} onClick={onClick} {...props}>
      {content}
    </button>
  );
}
