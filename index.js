const spawn = require('child_process').spawn;
flag = 0;
flag2 = 0;
flag3 = 0;
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
	  if (prompt != '') {
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
	else {
		client.sendMessage(message.from,'Please enter a question');

	}
	}

	if(tokens[0] === '!findAnime')
	{
		const animeName = tokens.slice(1).join(' ');
		client.sendMessage(message.from,'Welcome to LibraAnime');
		client.sendMessage(message.from,'Note that we use animerush as our database');
		const childPython = spawn('python', ['AnimeBot.py',flag, animeName]);

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

		client.sendMessage(message.from,'Please enter !downAnime (space $ space ) (copy paste) the name of the anime you want to download followed by (space $ space) episode number for example:!DownAnime $ Attack on titan $ 1');


	}

	if(tokens[0] === '!downAnime')
	{
			flag = 1;

			const tokens2 = message.body.split('$').map(token => token.trim());

			const childPython2 = spawn('python', ['AnimeBot.py',flag, tokens2[1], tokens2[2]]);
			
			childPython2.stdout.on('data', (data) => 
			{
				console.log(data.toString());
				//client.sendMessage(message.from, data.toString());
			});
		
			childPython2.stderr.on('data', (data) => {
				console.log(`stderr: ${data}`);
			});
		
			childPython2.on('close', (code) => {
				console.log(`child process exited with code ${code}`);
			});
				
			flag = 0;
	}

	if(tokens[0] === '!findManga')
	{
		flag2 = 0;
		const mangaName = tokens.slice(1).join(' ');
		client.sendMessage(message.from,'Welcome to LibraManga');
		client.sendMessage(message.from,'Note that we use readm.org as our database');
		client.sendMessage(message.from,'Please enter !getManga the name of the manga from the list bellow you want to read for example:!getManga Attack on titan');
		const childPython = spawn('python', ['MangaBot.py',flag2,mangaName]);
		
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
	if (tokens[0] === '!getManga') 
	{
		flag2 = 1;
		const mangaName = tokens.slice(1).join(' ');
		const childPython = spawn('python', ['MangaBot.py',flag2,mangaName]);

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

	if(tokens[0] === '!findMovie')
	{
		flag3 = 0;
		const movieName = tokens.slice(1).join(' ');
		client.sendMessage(message.from,'Welcome to LibraMovies');
		client.sendMessage(message.from,'Note that we use fmovies as our database');
		client.sendMessage(message.from,'Please enter !getMovie the name of the movie from the list bellow you want to watch for example:!getMovie Attack on titan');
		const childPython = spawn('python', ['MovieBot.py',flag3, movieName]);

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

	if(tokens[0] === '!getMovie')
	{
		flag3 = 1;
		const movieName = tokens.slice(1).join(' ');
		const childPython = spawn('python', ['MovieBot.py',flag3, movieName]);

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

	if(tokens[0] === '!help')
	{
		client.sendMessage(message.from,'Welcome to LibraHelp');
		client.sendMessage(message.from,'!findBook (space) (book name) to find a book');
		client.sendMessage(message.from,'!ask (space) (question) to ask a question');
		client.sendMessage(message.from,'!findAnime (space) (anime name) to find an anime');
		client.sendMessage(message.from,'!findManga (space) (manga name) to find a manga');
		client.sendMessage(message.from,'!findMovie (space) (movie name) to find a movie');

	}

  });


client.initialize();








