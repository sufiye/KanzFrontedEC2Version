
"use client";

import { Footer, FooterCopyright, FooterIcon, FooterTitle } from "flowbite-react";

export function FooterDemo() {
  return (
    <Footer bgDark>
      <div className="w-full text-white">
        <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
          <div>
            <FooterTitle title="Company" />
            <aGroup col>
              <a href="#">About</a>
              <a href="#">Careers</a>
              <a href="#">Brand Center</a>
              <a href="#">Blog</a>
            </aGroup>
          </div>
          <div>
            <FooterTitle title="help center" />
            <aGroup col>
              <a href="#">Discord Server</a>
              <a href="#">Twitter</a>
              <a href="#">Facebook</a>
              <a href="#">Contact Us</a>
            </aGroup>
          </div>
          <div>
            <FooterTitle title="legal" />
            <aGroup col>
              <a href="#">Privacy Policy</a>
              <a href="#">Licensing</a>
              <a href="#">Terms &amp; Conditions</a>
            </aGroup>
          </div>
          <div>
            <FooterTitle title="download" />
            <aGroup col>
              <a href="#">iOS</a>
              <a href="#">Android</a>
              <a href="#">Windows</a>
              <a href="#">MacOS</a>
            </aGroup>
          </div>
        </div>
        <div className="w-full bg-gray-700 px-4 py-6 sm:flex sm:items-center sm:justify-between">
          <FooterCopyright href="#" by="Flowbite™" year={2022} />
        </div>
      </div>
    </Footer>
  );
}
