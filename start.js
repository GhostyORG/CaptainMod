// clears the console
console.clear();

// registers the commands
require(`./deploy`)
console.log(`Registering slash commands...`);


setTimeout(() => console.log("Starting bot..."), 1000);
// starts the actual bot
setTimeout(() => require("./index"), 1000);