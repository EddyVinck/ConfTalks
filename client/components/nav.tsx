import React from "react";
import Link from "next/link";
import { Container } from "./layout";

const links = [
  { href: "/", label: "ConfTalks", key: "a" },
  { href: "/contributing", label: "Contributing", key: "b" },
  { href: "/about", label: "About", key: "c" }
];

const Nav = () => (
  <Container>
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

      <style jsx>{`
        :global(body) {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
            Helvetica, sans-serif;
        }
        nav {
          text-align: center;
        }
        ul {
          display: flex;
          justify-content: space-between;
        }
        nav > ul {
          padding: 4px 16px;
        }
        li {
          display: flex;
          padding: 6px 8px;
        }
        a {
          color: #067df7;
          text-decoration: none;
          font-size: 13px;
        }
      `}</style>
    </nav>
  </Container>
);

export default Nav;
