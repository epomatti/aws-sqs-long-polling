import { start } from './sqs';

(async () => {
  try {
    await start();
  } catch (e) {
    console.error(e);
  }
})();
