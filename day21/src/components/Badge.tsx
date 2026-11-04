import '../styles/badge.css'
export type variant = 'green' | 'yellow' | 'red' | 'gray';


type BadgeProps = {
  label: string;
  variant: variant
};

export default function Badge({ label, variant }: BadgeProps) {
  return (
    <span className={`badge badge-${variant}`}>
      {label}
    </span>
  );
}
