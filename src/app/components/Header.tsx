import Link from "next/link";
import { getSignInUrl, withAuth, signOut } from "@workos-inc/authkit-nextjs";

export default async function Header() {
  const { user } = await withAuth();
  const signInUrl = await getSignInUrl();

  return (
    <header>
      <div className="flex items-center justify-between mx-auto">
        <div>
          <Link href={"/"} className="font-bold text-2xl text-primary/90">
            Yük Yolu
          </Link>
        </div>
        <nav className="flex gap-4">
          {/* Login button */}
          {!user && (
            <Link
              href={signInUrl}
              className=" text-yellow-400 rounded-lg px-4 py-2"
            >
              Giriş
            </Link>
          )}

          {/* Logout button */}
          {user && (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                type="submit"
                className=" text-yellow-400 rounded-lg px-4 py-2"
              >
                Çıkış
              </button>
            </form>
          )}

          {/* Job post button */}
          <Link
            href={"/new-listing"}
            className="bg-yellow-400 text-white rounded-lg px-4 py-2 font-bold"
          >
            İş ilanı ver
          </Link>
        </nav>
      </div>
    </header>
  );
}
