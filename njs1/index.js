const casual = require("casual");
casual.seed(1);
// console.log(casual.city, casual.integer(1, 10));
console.log(`${casual.name_prefix} ${casual.full_name}`);

casual.define("user", () => ({
    name: casual.name,
    email: casual.email,
    age: casual.integer(14, 100),
}));

const user = casual.user;
console.log(user);

console.log(
    Array(5)
        .fill(null)
        .map(() => casual.user)
);
