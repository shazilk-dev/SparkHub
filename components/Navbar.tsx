import Link from "next/link";
import { auth, signOut, signIn } from "@/auth";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="navbar">
      <nav className="flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <img
            src="/logo5.png"
            alt="SparkHub"
            className="h-8 w-auto object-contain" // Reduced from h-12 to h-8
          />
        </Link>

        <div className="flex items-center gap-2 text-white">
          {" "}
          {/* Reduced gap from 4 to 2 */}
          <ThemeToggle />
          {session && session?.user ? (
            <>
              <Link
                href="/startup/create"
                className="px-3 py-1.5 rounded-lg bg-primary/20 border border-primary/30 hover:bg-primary/30 transition-all duration-300 text-xs font-medium" // Reduced padding and text size
              >
                <span>Create</span>
              </Link>

              <Link
                href={`/user/${session?.id}`}
                className="px-2 py-1 rounded-full bg-glass-light border border-glass-border hover:bg-glass-medium transition-all duration-300 text-xs" // Reduced padding and text size
              >
                <span>{session?.user?.name}</span>
              </Link>

              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="px-2 py-1 rounded-lg text-dark-400 hover:text-white transition-colors text-xs" // Reduced padding and text size
                >
                  Logout
                </button>
              </form>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit" className="login text-xs">
                {" "}
                {/* Reduced text size */}
                Login with GitHub
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
