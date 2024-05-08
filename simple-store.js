import { createClient } from 'redis';

const client = createClient();

await client.connect();

// Cleanning data
await client.del('mykey');

// Store data
await client.set('mykey', 'myvalue');

// Getting data
const result = await client.get('mykey');

console.log(result);

await client.quit();