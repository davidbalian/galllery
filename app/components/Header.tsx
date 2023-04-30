import Search from "./Search";
import "../css/header.css";
import Logo from "./Logo";
import "../globals.css";

function Header() {
  return (
    <header>
      <Logo />
      <Search />
    </header>
  );
}

export default Header;
