export { default } from "next-auth/middleware"

export const config = {
    matcher: [
        '/((?!student|teacher$|$).*)', // Match everything except /student, /teacher, and /
    ],
};