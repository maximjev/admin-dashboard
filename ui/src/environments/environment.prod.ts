export const environment = {
  production: true,
  config : {
    pageSize: 10
  },
  api: {
    keys: {
      auth: {
        clientId: 'web',
        secret: 'secret'
      }
    },
    urls: {
      auth: {
        token: '/api/oauth/token'
      },
      users: {
        requestReset: '/api/users/request',
        token: '/api/users/token',
        reset: '/api/users/reset'
      },
      transactions: {
        base: '/api/transactions',
        get: (id: string) => `/api/transactions/${id}`,
        persist: (id: string) => `/api/transactions/${id}`,
        types: '/api/transactions/types',
        export: '/api/transactions/export'
      }
    },
    unauthorizedUrls: [
      new RegExp('^/api/oauth/token$'),
      new RegExp('^/api/users/request$'),
      new RegExp('^/api/users/token$'),
      new RegExp('^/api/users/reset$')
    ]
  },
  defaultRoutes: [
    { role: 'ROLE_USER', route: '/panel/dashboard' },
    { role: 'ROLE_ADMIN', route: '/panel/dashboard' }
  ]
};
