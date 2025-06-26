declare module 'react-native-pdf-lib' {
  interface PDFDocument {
    addPages: (pages: PDFPage[]) => Promise<string>;
    writeToFile: (path: string) => Promise<string>;
  }

  interface PDFPage {
    text: string;
    fontSize?: number;
    fontName?: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }

  interface PDFLib {
    PDFDocument: {
      create: () => Promise<PDFDocument>;
    };
    PDFPage: {
      create: (options: {
        width?: number;
        height?: number;
        text?: string;
        fontSize?: number;
      }) => PDFPage;
    };
  }

  const PDFLib: PDFLib;
  export default PDFLib;
}
