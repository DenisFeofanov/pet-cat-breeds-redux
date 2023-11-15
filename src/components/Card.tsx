import { Character } from "@/interfaces/Character";

interface Props {
  character: Character;
}

export default function Card({
  character: { name, birth_year, gender },
}: Props) {
  return (
    <button className="border p-4 hover:border-black w-full text-left">
      <div>Name: {name}</div>
      <div>Birth year: {birth_year}</div>
      <div>Gender: {gender}</div>
    </button>
  );
}
