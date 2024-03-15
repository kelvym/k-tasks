export const createOptions = ({
  auth,
  method,
  body,
}: {
  auth: string | null
  method?: RequestInit['method']
  body?: Record<string, string | number>
}) => ({
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${auth}`,
  },
  method: method ? method : 'GET',
  ...(body && { body: JSON.stringify(body) }),
})
