interface Props {
  page: number;
  onNextClick: () => void;
  onPreviousClick: () => void;
  pagesAmount: number;
}

export default function Pagination({
  page,
  onNextClick,
  onPreviousClick,
  pagesAmount,
}: Props) {
  return (
    <div className="whitespace-nowrap">
      <button
        className="disabled:text-gray-300"
        onClick={onPreviousClick}
        type="button"
        disabled={page === 1}
      >
        &lt;
      </button>

      <span className="mx-4">{page}</span>

      <button
        className="disabled:text-gray-300"
        onClick={onNextClick}
        type="button"
        disabled={page === pagesAmount}
      >
        &gt;
      </button>
    </div>
  );
}
