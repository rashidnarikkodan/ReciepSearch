import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md';
  asLink?: boolean;
}

export function Logo({ size = 'sm', asLink = false }: LogoProps) {
  const content = (
    <div className="flex items-center gap-2">
      <span
        className={`font-bold tracking-tight text-[#242824] ${
          size === 'md' ? 'text-base' : 'text-sm'
        }`}
      >
        RecipeSearch
      </span>
      <span
        className={`rounded-full bg-[#365B45] ${
          size === 'md' ? 'w-2 h-2' : 'w-1.5 h-1.5'
        }`}
      />
    </div>
  );

  if (asLink) {
    return (
      <Link to="/" className="inline-flex items-center hover:opacity-90 transition-opacity">
        {content}
      </Link>
    );
  }

  return content;
}
