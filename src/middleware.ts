import { authkitMiddleware } from "@workos-inc/authkit-nextjs";

export default authkitMiddleware();

// Apply middleware to all routes
export const config = { matcher: "/:path*" };
