import Heading from "@/components/Heading";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="py-12 px-6 md:px-12">
        <Heading>404 Not Found</Heading>

        <p className="mt-2">No cats here</p>

        <div className="mt-2">
          <Link className="underline" href="/">
            Return Home
          </Link>
        </div>
      </div>
    </>
  );
}
