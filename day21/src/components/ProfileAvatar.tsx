import { Avatar, AvatarFallback } from "./ui/avatar";

type AvatarProps = {
  name: string;
};

export default function ProfileAvatar({ name }: AvatarProps) {
  const initial = name
  .split(' ')
  .reduce((init, word) => init + ( word[0] || '' ), '')
  .slice(0,3)
  .toUpperCase();

  return (
    <div className="relative inline-flex items-center group w-fit cursor-pointer">
        <Avatar>
            <AvatarFallback>{initial}</AvatarFallback>
        </Avatar>
        
        <span className="absolute right-12 z-50 bg-popover text-popover-foreground text-xs px-2 py-1 rounded-md shadow-md border opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {name}
        </span>
    </div>
  );
}
