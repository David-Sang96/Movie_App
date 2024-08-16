const Footer = () => {
  return (
    <footer className="border-t border-gray-800 bg-black py-6 text-white md:px-8 md:py-0">
      <div className="flex items-center md:h-24">
        <p className="text-muted-foreground text-balance text-center text-sm leading-loose md:text-left">
          Built by{" "}
          <a
            href="https://github.com/David-Sang96/Movie_App"
            target="_blank"
            className="font-medium underline underline-offset-4"
          >
            David Nawl Sang Luai
          </a>
          . Source code is available on{" "}
          <a
            href="https://github.com/David-Sang96/Movie_App"
            target="_blank"
            className="font-medium underline underline-offset-4"
            rel="noreferrer"
          >
            Github
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
