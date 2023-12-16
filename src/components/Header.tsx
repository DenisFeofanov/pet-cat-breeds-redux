function Header({ children }: React.PropsWithChildren) {
  return (
    <header className="border-b border-black flex justify-between items-center pb-4">
      {children}
    </header>
  );
}

export default Header;
