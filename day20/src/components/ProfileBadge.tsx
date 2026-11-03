type AvatarProps = {
  name: string;
};

export default function Avatar({ name }: AvatarProps) {
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="avatar" aria-label={name}>
      {initial}
    </div>
  );
}
