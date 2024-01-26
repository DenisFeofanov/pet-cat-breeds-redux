import { ChangeEvent, FormEvent, useState } from "react";

interface Props {
  onSearch: (value: string | null) => void;
}

export default function Search({ onSearch }: Props) {
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSearch(value.trim() || null);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value === "") onSearch(null);
    setValue(e.target.value);
  }

  return (
    <form onSubmit={e => handleSubmit(e)} role="search">
      <input
        className="max-w-[9rem]"
        type="search"
        value={value}
        onChange={e => handleChange(e)}
        placeholder="Search..."
        aria-label="Search"
      />
    </form>
  );
}
