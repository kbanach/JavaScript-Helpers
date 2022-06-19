export default async function () {
  console.log('Teardown tests environment');
  // @ts-ignore
  globalThis?.server?.close();
}
