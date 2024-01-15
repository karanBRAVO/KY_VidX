"use client";

const GlobalError = ({ error, reset }) => {
  return (
    <html>
      <body className="text-white">
        <h2 className="text-6xl text-white font-black">
          Something went wrong!
        </h2>
        <button
          className="text-white bg-black px-2 py-3"
          onClick={() => reset()}
        >
          Try again
        </button>
      </body>
    </html>
  );
};

export default GlobalError;
