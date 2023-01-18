function Button({ children, ...rest }) {
  return (
    <button
      className="text-white bg-gray-700 p-3 w font-medium rounded-lg flex align-middle gap-2"
      {...rest}
    >
      {children}
    </button>
  );
}

export { Button }
