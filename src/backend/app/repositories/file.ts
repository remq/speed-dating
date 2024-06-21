export interface IFileRepository {
  uploadFile(id: string, filePath: string): Promise<string>;
  deleteFile(...urls: string[]): Promise<void>;
}
