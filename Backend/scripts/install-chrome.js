/**
 * Script to programmatically install Chrome for Puppeteer using @puppeteer/browsers.
 * This avoids the permission denied issue when using the puppeteer CLI on Render.
 */

const { install, resolveBuildId, Browser, detectBrowserPlatform } = require("@puppeteer/browsers");
const path = require("path");
const os = require("os");

const cacheDir = process.env.PUPPETEER_CACHE_DIR || path.join(os.homedir(), ".cache", "puppeteer");

console.log(`Installing Chrome for Puppeteer into: ${cacheDir}`);

const platform = detectBrowserPlatform();

resolveBuildId(Browser.CHROME, platform, "stable")
    .then((buildId) => {
        console.log(`Resolved Chrome build ID: ${buildId} for platform: ${platform}`);
        return install({
            browser: Browser.CHROME,
            buildId,
            cacheDir,
            downloadProgressCallback: (downloaded, total) => {
                if (total) {
                    const pct = Math.round((downloaded / total) * 100);
                    process.stdout.write(`\rDownloading Chrome: ${pct}%`);
                }
            },
        });
    })
    .then((result) => {
        console.log(`\nChrome installed successfully at: ${result.executablePath}`);
    })
    .catch((err) => {
        console.error("Failed to install Chrome:", err.message);
        process.exit(1);
    });
