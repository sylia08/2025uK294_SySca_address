const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="layout">
    <header>📦 Address Manager</header>
    <main>{children}</main>
    <footer>© 2025</footer>
  </div>
);

export default Layout;
