declare module 'react-native-html-to-pdf' {
  interface ConvertOptions {
    html: string;
    fileName: string;
    directory?: string;
    width?: number;
    height?: number;
    padding?: number;
    bgColor?: string;
    base64?: boolean;
  }

  interface ConvertResult {
    filePath?: string;
    base64?: string;
  }

  const RNHTMLtoPDF: {
    convert: (options: ConvertOptions) => Promise<ConvertResult>;
  };

  export default RNHTMLtoPDF;
}

declare module 'react-native-fs' {
  const RNFS: {
    DocumentDirectoryPath: string;
    ExternalDirectoryPath: string;
    DownloadDirectoryPath: string;
    writeFile: (filepath: string, contents: string, encoding?: string) => Promise<void>;
    readFile: (filepath: string, encoding?: string) => Promise<string>;
    unlink: (filepath: string) => Promise<void>;
    exists: (filepath: string) => Promise<boolean>;
  };

  export default RNFS;
}
