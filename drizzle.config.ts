import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './db/schema',
  dialect: 'sqlite',
  driver: 'd1-http',
  tablesFilter: ['/^(?!.*_cf_KV).*$/']
,
  dbCredentials: {
    accountId: "43acfafa27d72f32283fb8c6948d639c",
    databaseId: "583d5de7-1a1f-4233-92f1-c2a368ae5a8e",
    token: "5vQAv0JuPHb7XdmTfyfNlKHMxTlzrD8fSL7ZNLTe",
  },
});