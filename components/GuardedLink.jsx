// components/GuardedLink.jsx
export default function GuardedLink({ to, className = "", children }) {
  const href = `/api/go?to=${encodeURIComponent(to)}`;
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
