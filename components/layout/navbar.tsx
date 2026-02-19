export default function Navbar() {
  //
  return (
    <nav className="py-5 bg-gray-200 flex items-center justify-between">
      <h1 className="navbar-title">My Website</h1>
      <ul className="navbar-links">
        <li>
          <a href="/x">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
}
