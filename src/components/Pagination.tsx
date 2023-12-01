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
    <div>
      <button onClick={onPreviousClick} type="button" disabled={page === 1}>
        Назад
      </button>

      <span className="mx-4">{page}</span>

      <button
        onClick={onNextClick}
        type="button"
        disabled={page === pagesAmount}
      >
        Дальше
      </button>
    </div>
  );
}
