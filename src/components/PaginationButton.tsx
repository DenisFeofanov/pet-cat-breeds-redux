interface Props {
  children: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
}

export default function PaginationButton({
  children,
  onClick,
  disabled,
}: Props) {
  return (
    <button
      className="disabled:text-gray-400"
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
