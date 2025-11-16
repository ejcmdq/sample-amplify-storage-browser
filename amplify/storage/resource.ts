import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'myStorageBucket',
  isDefault: true,
  access: (allow) => ({
    // Public area: everyone (guest or authenticated) can READ only
    'public/*': [
      allow.guest.to(['read']),
      allow.authenticated.to(['read']),
    ],

    // Admin area: only "admin" group can change; others can only read
    'admin/*': [
      allow.groups(['admin']).to(['read', 'write', 'delete']),
      allow.authenticated.to(['read']),
    ],

    // Private per-identity data (not used for our public archive, but kept)
    'private/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete']),
    ],

    // Backup area in the secondary bucket – only admins use this
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
