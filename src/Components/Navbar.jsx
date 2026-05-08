import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [open, setOpen] = useState(false);
  const [memberOpen, setMemberOpen] = useState(false); // mobile dropdown toggle

  // ScrollSpy
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const handleScroll = () => {
      let current = "";
      sections.forEach((sec) => {
        const top = sec.offsetTop - 200;
        const height = sec.offsetHeight;
        const id = sec.getAttribute("id");
        if (window.scrollY >= top && window.scrollY < top + height) {
          current = id;
        }
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkStyle =
    "flex gap-2 items-center px-2 py-2 rounded-full font-medium hover:bg-blue-400 hover:text-white transition-all";
  const activeStyle = "bg-blue-300 text-[#183883]";

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#FFFFFF] opacity-90 text-[#183883] shadow-md z-50">
      <div className="max-w-8xl mx-auto flex justify-between items-center p-2 px-4 lg:px-8">
        {/* Logo */}
        <div className="flex-1 flex justify-start">
          <img
            src="https://i.ibb.co/vxTSNL7B/Group-1.png"
            className="w-32"
            alt="Logo"
          />
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-2 justify-end flex-1">
          <li>
            <Link
              to="/"
              className={`${linkStyle} ${
                activeSection === "home" ? activeStyle : ""
              }`}
            >
              HOME
            </Link>
          </li>

          {/* Desktop Dropdown */}
          <li>
            <Link to="/addTeacher"
                  
              className={`${linkStyle} ${
                activeSection === "Book" ? activeStyle : ""
              }`}
            >
              ADDTEACHER
            </Link>
          </li>

          <li>
            <Link to="/AddStudent"
             
              className={`${linkStyle} ${
                activeSection === "Book" ? activeStyle : ""
              }`}
            >
              ADDSTUDENT
            </Link>
          </li>

          <li>
            <Link to="/all-teachers"
             
              className={`${linkStyle} ${
                activeSection === "Book" ? activeStyle : ""
              }`}
            >
              TEACHER
            </Link>
          </li>

          <li>
            <Link to="/all-students"
              
              className={`${linkStyle} ${
                activeSection === "Book" ? activeStyle : ""
              }`}
            >
              STUDENT
            </Link>
          </li>

          <li>
            <Link
              to="/select"
              className={`${linkStyle} ${
                activeSection === "service" ? activeStyle : ""
              }`}
            >
              LOGIN
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex justify-end flex-1">
          <button className="text-2xl font-bold" onClick={() => setOpen(!open)}>
            {open ? <FiX size={26} /> : <GiHamburgerMenu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <ul
          className={`md:hidden absolute bg-[#81BFF1] w-full left-0 top-16 p-4 flex flex-col gap-2 transition-all duration-300 ${
            open ? "block" : "hidden"
          }`}
        >
          <li>
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className={`${linkStyle} ${
                activeSection === "home" ? activeStyle : ""
              }`}
            >
              HOME
            </Link>
          </li>
          
          

          {/* Mobile Dropdown with click */}
          <li className="relative">
            <div
              className={`${linkStyle} cursor-pointer`}
              onClick={() => setMemberOpen(!memberOpen)}
            >
               MEMBERS
            </div>
            <ul
              className={`bg-white rounded-xl shadow-lg w-44 overflow-hidden mt-2 transition-all ${
                memberOpen ? "block" : "hidden"
              }`}
            >
              <li>
                <a
                  className="block px-4 py-2 hover:bg-blue-400 hover:text-white cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  Teachers
                </a>
              </li>
              <li>
                <a
                  className="block px-4 py-2 hover:bg-blue-400 hover:text-white cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  Students
                </a>
              </li>
            </ul>
          </li>

          <li>
            <Link
              to="/select"
              onClick={() => setOpen(false)}
              className={`${linkStyle} ${
                activeSection === "service" ? activeStyle : ""
              }`}
            >
               LOGIN
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
