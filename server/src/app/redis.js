const util = require("util");
const redis = require("redis");
// 6379
const client = redis.createClient({
	password: process.env.REDIS_PASS,
	socket: {
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT,
	},
});

(async () => {
	await client.connect();
})();

client.on("connect", function () {
	console.log("Redis Connected!");
});

client.on("error", function (error) {
	console.error("Redis Error: ", error);
});

const set = async (key, value) => {
	await client.set(key, JSON.stringify(value));
};

const get = async (key) => {
	const data = await client.get(key);

	return JSON.parse(data);
};

const exists = async (key) => {
	const isExists = await client.exists(key);

	return isExists === 1;
};

module.exports = {
	set,
	get,
	exists,
};
