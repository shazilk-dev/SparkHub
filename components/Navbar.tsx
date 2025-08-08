import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="navbar">
      <nav className="flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo7.png"
            alt="SparkHub"
            width={220}
            height={220}
            className="h-20 w-auto object-contain"
            priority
          />
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {session && session?.user ? (
            <>
              <Link
                href="/startup/create"
                className="px-3 py-1.5 rounded-lg bg-primary/20 border border-primary/30 hover:bg-primary/30 transition-all duration-300 text-xs font-medium"
                style={{
                  background:
                    "color-mix(in srgb, var(--primary) 20%, transparent)",
                  borderColor:
                    "color-mix(in srgb, var(--primary) 30%, transparent)",
                  color: "var(--text-primary)",
                }}
              >
                <span>Create</span>
              </Link>

              <Link
                href={`/user/${session?.id}`}
                className="px-2 py-1 rounded-full border transition-all duration-300 text-xs"
                style={{
                  background: "var(--card-bg)",
                  borderColor: "var(--border)",
                  color: "var(--text-primary)",
                }}
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
                  className="px-2 py-1 rounded-lg transition-colors text-xs"
                  style={{ color: "var(--text-muted)" }}
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
