const next = require('next');
const nextApp = next({ dev: false });
const handle = nextApp.getRequestHandler();
(async () => {
    const payload = await import('payload');
    await nextApp.prepare();
    await payload.default.init();
    // Start Next.js server
    nextApp.server.listen(process.env.PORT || 3000, () => {
        console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
})();