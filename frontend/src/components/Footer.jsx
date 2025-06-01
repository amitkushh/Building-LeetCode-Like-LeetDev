import React from "react";
import X from "@/assets/x-social.svg";

function Footer() {
  return (
    <footer>
      <div className="flex justify-end items-center md:px-24 px-4 gap-2 mb-3">
        <p>
          Created by <span className="underline">Amit</span>
        </p>
        <span>
          <a href="https://x.com/amitkushh">
            <img src={X} alt="twitter" height={25} width={25} />
          </a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
