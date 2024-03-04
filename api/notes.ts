export const getAll = () => {
  return {
    url: 'http://localhost:4000/v1/notes',
    options: {
      method: 'GET',
    },
  }
}

export const getNote = ({ id }: { id: string }) => {
  return {
    url: 'http://localhost:4000/v1/notes/' + id,
    options: {
      method: 'GET',
    },
  }
}

export const updateNote = ({ id, text }: { id: string; text: string }) => {
  return {
    url: 'http://localhost:4000/v1/notes/' + id + '/text',
    options: {
      method: 'PUT',
      body: JSON.stringify({ text }),
    },
  }
}
