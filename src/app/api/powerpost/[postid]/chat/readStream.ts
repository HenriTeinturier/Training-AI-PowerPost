export const readStream = async (
  stream: ReadableStream,
  onChunkValue: (chunk: string) => void
) => {
  const reader = stream.getReader();
  const decoder = new TextDecoder("utf-8");
  let done = false;

  let result = "";
  while (!done) {
    // eslint-disable-next-line no-await-in-loop
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    const chunkValue = decoder.decode(value);

    const chunckValueClean = chunkValue.replace(/0:"(.*?)"/g, "$1");

    result += chunckValueClean;

    onChunkValue(result);
  }
};
