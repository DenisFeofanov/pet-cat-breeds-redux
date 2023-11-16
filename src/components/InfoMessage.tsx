export default function InfoMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return <h3 className="mt-16">{children}</h3>;
}
