# LibraLinks
A whatsapp chat bot that provides you with pdf of books you want
To install all necessary dependencies follow the links /n
https://wwebjs.dev/guide/#installation
If the client is not displaying "client is ready" Follow these steps
      It seems there is a problem with WhatsApp, in your node_modules folder, search
      whatsapp-web.js -> src -> Client.js
      and then, replace the line: 175 with:   
      const INTRO_IMG_SELECTOR = 'div[role=\'textbox\']'; //'[data-icon=\'chat\']';

