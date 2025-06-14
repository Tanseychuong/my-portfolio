export function Card({ children, className = "", ...props }) {
  return (
    <div className={\`bg-white rounded-2xl shadow p-4 \${className}\`} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return <div className="text-left space-y-2">{children}</div>;
}
