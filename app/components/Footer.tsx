import React from "react";
import { AiOutlineTwitter, AiOutlineInstagram } from "react-icons/ai";

type FooterProps = {};

const Footer: React.FC<FooterProps> = () => {
  return (
    <div className="text-[#324d67] text-center mt-5 py-8 px-3 font-bold flex items-center gap-3 justify-center">
      {/* footer-container */}
      <p>20223 TechStore All rights reserved</p>
      <p className="text-3xl flex gap-3">
        {/* icons */}
        <AiOutlineInstagram />
        <AiOutlineTwitter />
      </p>
    </div>
  );
};
export default Footer;
