function Header({ children }: React.PropsWithChildren) {
  return (
    <header className="border-b border-black flex justify-between items-center py-6 mx-12">
      {children}
    </header>
  );
}

export default Header;
