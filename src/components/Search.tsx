import { FormEvent, useState } from "react";

interface Props {
  onSearch: (value: string | null) => void;
}

export default function Search({ onSearch }: Props) {
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSearch(inputValue || null);
  }

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder="Search..."
      />
    </form>
  );
}
