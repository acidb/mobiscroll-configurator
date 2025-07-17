const next = require('next');
const payload = require('payload');
const express = require('express');

const app = express();
const nextApp = next({ dev: false });
const handle = nextApp.getRequestHandler();

(async () => {
    await nextApp.prepare();
    await payload.init({ express: app });

    app.all('*', (req, res) => handle(req, res));

    app.listen(process.env.PORT || 3000);
})();