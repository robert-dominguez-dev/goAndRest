import RNBlobUtil from 'react-native-blob-util';

export const writeUtf8File = (path: string, content: string): Promise<void> =>
  RNBlobUtil.fs.writeFile(path, content, 'utf8');

export const readUtf8File = (path: string): Promise<string> =>
  RNBlobUtil.fs.readFile(path, 'utf8');
