export const saveDraftMock = async (data: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.2) {
        resolve({
          success: true,
          id: Date.now(),
          ...data,
        });
      } else {
        reject(new Error("Network error."));
      }
    }, 1000);
  });
};