import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'myStorageBucket',
  isDefault: true,
  access: (allow) => ({
    // Área pública: leitura para convidados e usuários autenticados
    'public/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read']),
    ],

    // Área admin: apenas grupo "admin" pode escrever/apagar; demais só leem
    'admin/*': [
      allow.groups(['admin']).to(['read', 'write', 'delete']),
      allow.authenticated.to(['read']),
    ],

    // Área privada por identidade (mantida para compatibilidade)
    'private/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete']),
    ],
  }),
});

// Bucket secundário usado para caminhos de backup_* (mantido para compatibilidade
// com amplify/backend.ts, que importa `secondaryStorage` deste módulo)
export const secondaryStorage = defineStorage({
  name: 'mySecondaryStorageBucket',
  access: (allow) => ({
    'backup_public/*': [
      allow.groups(['admin']).to(['read', 'write', 'delete']),
    ],
    'backup_admin/*': [
      allow.groups(['admin']).to(['read', 'write', 'delete']),
      allow.authenticated.to(['read']),
    ],
    'backup_private/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete']),
    ],
  }),
});
