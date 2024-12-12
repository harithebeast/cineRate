import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { firebaseAuth } from "../utils/firebase-config";
import { FaPowerOff, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { signOut } from "firebase/auth";

export default function Navbar({ isScrolled }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);

  const links = [
    { name: "Home", link: "/" },
    { name: "TV Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My List", link: "/mylist" },
  ];

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <Container>
      <nav className={`${isScrolled ? "scrolled" : ""} ${showMenu ? "menu-open" : ""}`}>
        <div className="left flex a-center">
          <div className="brand flex a-center j-center">
            <img src={logo} alt="Logo" />
          </div>
          <div className="menu-toggle" onClick={toggleMenu}>
            {showMenu ? <FaTimes /> : <FaBars />}
          </div>
        </div>
        <ul className={`links flex a-center j-center ${showMenu ? "show" : ""}`}>
          {links.map(({ name, link }) => (
            <li key={name}>
              <StyledLink to={link} onClick={toggleMenu}>
                {name}
              </StyledLink>
            </li>
          ))}
        </ul>
        <div className="right flex a-center">
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) {
                  setShowSearch(false);
                }
              }}
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
            />
          </div>
          <button onClick={() => signOut(firebaseAuth)}>
            <FaPowerOff />
          </button>
        </div>
      </nav>
    </Container>
  );
}

const Container = styled.div`
  .scrolled {
    background-color: black;
  }
  nav {
    position: sticky;
    top: 0;
    height: 6.5rem;
    width: 100%;
    justify-content: space-between;
    position: fixed;
    top: 0;
    z-index: 2;
    padding: 0 4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    display: flex;
    flex-wrap: wrap;
    .left {
      display: flex;
      align-items: center;
      .brand {
        img {
          height: 4rem;
        }
      }
      .menu-toggle {
        display: none;
        cursor: pointer;
        svg {
          font-size: 1.8rem;
          color: white;
        }
      }
    }
    .links {
      list-style-type: none;
      display: flex;
      gap: 2rem;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: 0;
      @media (max-width: 768px) {
        position: fixed;
        top: 6.5rem;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: black;
        flex-direction: column;
        gap: 1rem;
        transform: translateX(${({ show }) => (show ? "0%" : "-100%")});
        transition: transform 0.3s ease-in-out;
        width: 100%;
        padding: 2rem 0;
        z-index: 1;
        li {
          a {
            color: white; /* Set link color to white */
            text-decoration: none;
            font-size: 1.8rem;
            padding: 1rem;
            &:hover {
              opacity: 0.8;
            }
          }
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
      gap: 1rem;
      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        &:focus {
          outline: none;
        }
        svg {
          color: #f34242;
          font-size: 1.2rem;
        }
      }
      .search {
        display: flex;
        gap: 0.4rem;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;
        button {
          background-color: transparent;
          border: none;
          &:focus {
            outline: none;
          }
          svg {
            color: white;
            font-size: 1.2rem;
          }
        }
        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;
          &:focus {
            outline: none;
          }
        }
      }
      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6);
        input {
          width: 100%;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
    }
  }
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  padding: 1rem;
  &:hover {
    opacity: 0.8;
  }
`;
