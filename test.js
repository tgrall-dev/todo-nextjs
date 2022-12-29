const bcrypt = require('bcryptjs');


async function test() {
  const myPass = 'password';

  // const hash = await bcrypt.hash('password123', 12);
  // console.log(hash);
  const hash = '$2a$10$41VDL99qY4govFThLf2tMOrr8OGEHMt6inw0wFBUZoAb.EUPeHPxi'

  console.log(await bcrypt.compare(myPass, hash));
}

test();