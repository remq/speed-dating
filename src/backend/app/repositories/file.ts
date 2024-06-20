export interface IFileRepository {
  uploadFile(id: string, filePath: string): Promise<string>;
  deleteFile(url: string): Promise<void>;
}
