const dns = require('dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

console.log('Testing MongoDB SRV DNS lookup...');

dns.promises
  .resolveSrv('_mongodb._tcp.portfolio-data.b6wvdj5.mongodb.net')
  .then((result) => {
    console.log('✅ SRV lookup successful:');
    console.log(result);
  })
  .catch((error) => {
    console.error('❌ SRV lookup failed:');
    console.error(error);
  });