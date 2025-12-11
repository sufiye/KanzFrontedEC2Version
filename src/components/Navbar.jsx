
import { Navbar, NavbarBrand, NavbarCollapse, NavbarToggle } from "flowbite-react";


export function NavbarDemo() {
  return (
    <Navbar fluid rounded>
      <NavbarBrand href="https://flowbite-react.com">
        <img src="src/image/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite React</span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <a className="text-white" href="#" active>
          Home
        </a>
        <a className="text-white" href="#">
          About
        </a>
        <a className="text-white" href="#">Services</a>
        <a className="text-white" href="#">Pricing</a>
        <a className="text-white" href="#">Contact</a>
      </NavbarCollapse>
    </Navbar>
  );
}
