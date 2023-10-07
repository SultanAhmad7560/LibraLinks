const spawn = require('child_process').spawn;

const { get } = require('http');
const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', message => {
	console.log(message.body);
});

 
client.on('message', message => {
	const tokens = message.body.split(' ');
  
	if (tokens[0] === '!findBook') {
	  const bookName = tokens.slice(1).join(' ');
	  client.sendMessage(message.from,'Welcome to LibraLinks');
	  client.sendMessage(message.from,'Note that we use libgen as our database so some url might not work due to the book not being available in libgen');
	  message.reply(`Searching for book: ${bookName}`);
	  const childPython = spawn('python', ['libgen.py', bookName]);
		
	  childPython.stdout.on('data', async (data) => {
		const downloadLinks = JSON.parse(data);
  
		// Access individual URLs using the keys of the dictionary
		const getUrl = downloadLinks['GET'];
		const cloudflareUrl = downloadLinks['Cloudflare'];
		const ipfsUrl = downloadLinks['IPFS.io'];
		
		client.sendMessage(message.from,"Download Links: ");
		client.sendMessage(message.from,"GET: ");
		client.sendMessage(message.from,getUrl);
		client.sendMessage(message.from,"Cloudflare: ");
		client.sendMessage(message.from,cloudflareUrl);
		client.sendMessage(message.from,"IPFS.io: ");
		client.sendMessage(message.from,ipfsUrl);
		// const { MessageMedia } = require('whatsapp-web.js');
  
		// const media = await MessageMedia.fromUrl(getUrl);
		// await chat.sendMessage(media);
	  });
  
	  childPython.stderr.on('data', (data) => {
		console.log(`stderr: ${data}`);
	  });
  
	  childPython.on('close', (code) => {
		console.log(`child process exited with code ${code}`);
	  });
	}

	if(tokens[0] === '!ask')
	{
	  const prompt = tokens.slice(1).join(' ');
	  console.log(prompt)
	  client.sendMessage(message.from,'Welcome to LibraTalks');
	  client.sendMessage(message.from,'Note that we use openai as our database');
	  const childPython = spawn('python', ['AiBot.py', prompt]);
		
	  childPython.stdout.on('data', (data) => 
	  {
		client.sendMessage(message.from, data.toString());
	  });
  
	  childPython.stderr.on('data', (data) => {
		console.log(`stderr: ${data}`);
	  });
  
	  childPython.on('close', (code) => {
		console.log(`child process exited with code ${code}`);
	  });
	}
  });


client.initialize();








