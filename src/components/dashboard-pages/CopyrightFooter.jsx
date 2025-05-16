const CopyrightFooter = () => {
  return (
    <div className="copyright-text">
      <p>
        © {new Date().getFullYear()} HGT by{" "}
        <a
          href="https://solvifytech.in/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Solvify Tech
        </a>
        . All Right Reserved.
      </p>
    </div>
  );
};

export default CopyrightFooter;
