import bcrypt from "bcryptjs";

const password = process.argv[2];
if (!password || password.length < 10) {
  console.error('Usage: npm run admin:hash -- "a-password-of-10+-characters"');
  process.exit(1);
}
const hash = await bcrypt.hash(password, 12);
console.log("Vercel environment variable value:\n" + hash);
console.log("\nLocal .env line:\nADMIN_PASSWORD_HASH=" + hash.replaceAll("$", "\\$"));
