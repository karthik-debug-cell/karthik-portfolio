export default function L({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <span className={`m ${className}`}><span className="i" data-intro>{children}</span></span>
}
