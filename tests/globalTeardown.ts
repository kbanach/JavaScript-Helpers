import { stat, rm } from 'fs/promises';

export default async function () {
  console.log('Teardown tests environment');

  try {
    // @ts-ignore
    globalThis?.server?.close();

    await stat('./build'); // checks that build/ exists
    await rm('./build', { recursive: true, force: true }); // removes build/ dir
  } catch {
    // as this is a cleanup, it can fail randomly - in case it's bringing some troubles, this is the place to handle them :)
  }
}
