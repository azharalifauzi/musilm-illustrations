export const deleteAllIllustrations = async () => {
  const res = await fetch('/api/v1/illustrations?limit=99999');

  const data = await res.json();
  const illustrations: Illustration[] = data.data;

  for (const illustration of illustrations) {
    const id = illustration._id;

    await fetch(`/api/v1/illustrations/${id}`, {
      method: 'DELETE',
    });
  }
};
