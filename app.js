// Load dependencies
const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');

const client = new Discord.Client();

fs.readdir('./events/', (err, files) => {
	if (err) return console.error(err);
	const jsfile = files.filter((f) => f.split('.').pop() === 'js');
	if (jsfile.length <= 0) {
		return console.log('No errors have been loaded!');
	}
	jsfile.forEach((file) => {
		const event = require(`./events/${file}`);
		const eventName = file.split('.')[0];
		client.on(eventName, event.bind(null, client));
	});
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir('./commands/', (err, files) => {
	if (err) console.error(err);
	const jsfile = files
		.filter((t) => !t.includes('.test.'))
		.filter((f) => f.split('.').pop() === 'js');
	if (jsfile.length <= 0) {
		return console.log('No commands have been loaded!');
	}
	jsfile.forEach((f) => {
		const pull = require(`./commands/${f}`);
		client.commands.set(pull.config.name, pull);
		pull.config.aliases.forEach((alias) => {
			client.aliases.set(alias, pull.config.name);
		});
	});
});

client.login(config.token);
