import { Nav } from "./Nav";

function Layout({ children }) {
  return (
    <div className="">
      <Nav />
      <main className="mx-14">{children}</main>
    </div>
  );
}

export { Layout };
