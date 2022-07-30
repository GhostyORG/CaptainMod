console.clear();

require(`./deploy`)
console.log(`Registering slash commands...`);

setTimeout(() => console.log("Starting bot..."), 1000);

setTimeout(() => require("./index"), 1000);