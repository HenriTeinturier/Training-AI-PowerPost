import { Github, Linkedin } from "lucide-react";

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
              <Linkedin size={16} />
              <Github size={16} />
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};
