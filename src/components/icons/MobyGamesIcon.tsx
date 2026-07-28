export const MobyGamesIcon = ({
  size = 20,
  className = "",
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-label="MobyGames"
  >
    <path d="M19 3H5C3.9 3 3 3.9 3 5v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1.5 13.5h-2.2v-5.4l-2.8 4.8h-1l-2.8-4.8v5.4H6.5V7.5h2.2l3.3 5.7 3.3-5.7h2.2v9z" />
  </svg>
);

export default MobyGamesIcon;
