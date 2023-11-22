import { Query } from "@/interfaces/Query";
import { FormEvent, useState } from "react";

interface Props {
  onSearch: (query: Query) => void;
}

export default function Search({ onSearch }: Props) {
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSearch({ search: inputValue || null });
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
