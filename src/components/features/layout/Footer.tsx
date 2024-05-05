import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className=" flex  w-full  bg-background justify-center pt-4">
      <div className="flex w-full max-w-screen-xl justify-between ">
        <div className="mt-0 w-full flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 text-muted-foreground">
          <div className="flex items-center gap-2 m-2 ">
            © 2024 Henri Teinturier™ All Rights Reserved.
          </div>

          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2 ">
              <a
                href="https://www.linkedin.com/feed/"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://github.com/HenriTeinturier"
                p
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                <Github size={16} />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};
