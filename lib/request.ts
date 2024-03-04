export const request = async ({
  config: { url, options },
  auth,
}: {
  config: {
    url: string
    options: RequestInit
  }
  auth: string | null
}) => {
  options = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${await auth}`,
    },
  }

  const response = await fetch(url, options)

  if (!response.ok) {
    throw new Error('Network response error')
  }

  const json = await response.json()

  return json
}
