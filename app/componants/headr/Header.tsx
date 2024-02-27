
import Link from "next/link";
import Menu from "./Menu";
import { getServerSession } from "next-auth/next";

import { options } from "../../api/auth/[...nextauth]/options";
const Header = async () => {
  const session =await getServerSession(options);

  return (
    <header>
      <nav>
        <div className="navbar justify-between bg-base-300">
          <Link href="/" className="btn btn-ghost text-lg">
            JDT SHOPE
          </Link>
          {session ?( <Link href="/api/auth/signout?callbackUrl=/">LOGUT</Link>)
          :(
            <Link href="/api/auth/signin">LOGIN</Link>
          )
          
          }
          <Menu />
        </div>
      </nav>
    </header>
  );
};

export default Header;
