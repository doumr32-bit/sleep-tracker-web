import { initApp } from './app.js';
import { createRepository } from './storage/repository.js';

const repository = createRepository(window.localStorage, 'sleep-records');

initApp({
  documentRef: document,
  repository
});
