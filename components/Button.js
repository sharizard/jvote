function Button({ children, disabled, ...rest }) {
  return (
    <button
      className={`text-gray-900 bg-fuchsia-100 p-3 w font-medium rounded-lg flex align-middle gap-2 ${
        disabled && "pointer-events-none bg-gray-200"
      }`}
      {...rest}
    >
      {children}
    </button>
  );
}

export { Button };
