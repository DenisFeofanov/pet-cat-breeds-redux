import Header from "@/components/Header";
import Heading from "@/components/Heading";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <div className="py-6">
        <Heading>404 Not Found</Heading>

        <p className="mt-2">No cats here</p>

        <div className="mt-2">
          <Link href="/">Return Home</Link>
        </div>
      </div>
    </>
  );
}
