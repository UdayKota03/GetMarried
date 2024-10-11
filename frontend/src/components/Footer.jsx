import React from "react";

const Footer = () => {
  return (
    <footer className="footer bg-neutral text-neutral-content p-10">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl ">GETMARRIED</h1>
        <p>YOUR PERFECT MATCH AWAITS!</p>
      </div>
      <div>
        <nav className="flex flex-col text-base">
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">How it works</a>
          <a className="link link-hover">Jobs</a>
        </nav>
      </div>
      <div>
        <nav className="flex flex-col text-base">
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
