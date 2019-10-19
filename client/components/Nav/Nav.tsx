import React, { useState } from "react";
import Link from "next/link";
import { Container } from "../layout";
import NavStyles from "./NavStyles";
import Hamburger from "./Hamburger";

const links = [
  { href: "/#videos", label: "Videos", key: "c" },
  { href: "/contributing", label: "Contributing", key: "b" },
  { href: "/about", label: "About", key: "d" }
];

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const classNames = isMenuOpen ? "open" : "";

  return (
    <NavStyles className={classNames}>
      <Container>
        <div className="menu-wrapper">
          <div className="menu-left">
            <h1>
              <Link href="/">
                <a>ConfTalks</a>
              </Link>
            </h1>
          </div>
          <div className="menu-right">
            <nav>
              <ul>
                {links.map(({ key, href, label }) => (
                  <li key={key}>
                    <Link href={href}>
                      <a>{label}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <Hamburger isMenuOpen={isMenuOpen} onClick={toggleMenu} />
        </div>
      </Container>
    </NavStyles>
  );
};

export default Nav;
