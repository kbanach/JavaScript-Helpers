import { execSync } from 'child_process';
import http from 'http';
import serveHandler from 'serve-handler';
import { GlobalConfigTsJest } from 'ts-jest';

export default async function (
  globalConfig: GlobalConfigTsJest,
): Promise<void> {
  console.log('Setup tests environment');

  const rootDir =
    typeof globalConfig?.rootDir === 'string' ? globalConfig?.rootDir : null;

  if (!rootDir) {
    throw new Error(
      'Root directory should be defined as Jest global config parameter (globalConfig.rootDir).',
    );
  }

  const buildDir = 'build';
  const serverPort = process.env.PORT || 3000;
  const publicUrl = 'http://localhost:3000';

  try {
    console.log('Starging build');
    execSync('yarn build', {
      cwd: rootDir,
      env: { ...process.env, PUBLIC_URL: publicUrl },
    });
    console.log('Build finished');
  } catch (err) {
    // @ts-ignore
    console.log(err?.stdout?.toString('utf-8'));

    // @ts-ignore
    console.error(err?.message);

    process.exit(1);
  }

  const server = http.createServer((req, res) => {
    return serveHandler(req, res, { public: buildDir });
  });

  server.listen(serverPort, () => {
    console.log(`Running at ${publicUrl}`);
  });

  // @ts-ignore
  globalThis.server = server;
}
