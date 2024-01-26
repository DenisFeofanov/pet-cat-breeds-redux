import placeholderImage from "@/../public/imagePlaceholder.svg";
import { Breed } from "@/interfaces/Cat";
import Image from "next/image";

interface Props {
  breeds: Breed[];
}

export function BreedsList({ breeds }: Props) {
  return (
    <ul className="flex flex-col gap-10 mt-12 md:grid md:grid-cols-3 md:gap-5 xl:grid-cols-5">
      {breeds.map(breed => {
        return (
          <li key={breed.id}>
            {breed.image?.url ? (
              <Image
                src={breed.image.url}
                width={breed.image.width}
                height={breed.image.height}
                alt="Cat photo"
                priority
              />
            ) : (
              <Image src={placeholderImage} alt="Cat photo placeholder" />
            )}

            <div className="flex flex-col gap-4 mt-4">
              <h3 className="text-3xl">{breed.name}</h3>

              <p>
                <i>Key personality traits:</i>
                <br />
                {breed.temperament}
              </p>
              <p>
                <i>Description:</i>
                <br />
                {breed.description}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
