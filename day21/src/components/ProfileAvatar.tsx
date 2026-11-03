import { Avatar, AvatarFallback } from "./ui/avatar";

type AvatarProps = {
  name: string;
};

export default function ProfileAvatar({ name }: AvatarProps) {
  const initial = name
  .split(' ')
  .reduce((init, word) => init + ( word[0] || '' ), '')
  .toUpperCase();

  return (
    <Avatar>
      <AvatarFallback>{initial}</AvatarFallback>
    </Avatar>
  );
}
