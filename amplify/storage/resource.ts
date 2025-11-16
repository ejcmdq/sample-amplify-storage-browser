import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'myStorageBucket',
  isDefault: true,
  access: (allow) => ({
    // ÚNICA área exposta via UI: /public/historical-data/*
    // Leitura liberada para convidados e usuários autenticados
    'public/historical-data/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read']),
    ],
  }),
});

// Bucket secundário mantido apenas para compatibilidade com backend.ts.
// Nenhum caminho é exposto pelo Storage Browser neste app público.
export const secondaryStorage = defineStorage({
  name: 'mySecondaryStorageBucket',
  access: (allow) => ({}),
});
