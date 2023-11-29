interface Props {
  page: number;
  onNextClick: () => void;
  onPreviousClick: () => void;
}

export default function Pagination({
  page,
  onNextClick,
  onPreviousClick,
}: Props) {
  return (
    <div className="mb-4">
      <button onClick={onPreviousClick} type="button">
        Назад
      </button>

      <span className="mx-4">{page}</span>

      <button onClick={onNextClick} type="button">
        Дальше
      </button>
    </div>
  );
}
