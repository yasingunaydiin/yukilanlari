import Link from "next/link";
import {
  getSignInUrl,
  getSignUpUrl,
  withAuth,
  signOut,
} from "@workos-inc/authkit-nextjs";
import { form } from "framer-motion/client";

export default async function Header() {
  const { user } = await withAuth();
  const signInUrl = await getSignInUrl();

  return (
    <header>
      <div className="flex items-center justify-between mx-auto">
        <Link href={"/"} className="font-extrabold  text-xl">
          Yük Yolu
        </Link>
        <nav className="flex gap-4 *:py-2 *:px-4 *:rounded-xl">
          {!user && <Link href={signInUrl}>Giriş</Link>}
          {user && (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button type="submit">Çıkış</button>
            </form>
          )}

          <Link
            href={"/new-listing"}
            className="bg-yellow-400 text-white rounded-lg font-bold"
          >
            Post a job
          </Link>
        </nav>
      </div>
    </header>
  );
}
