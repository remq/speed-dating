export interface IFileRepository {
  uploadFile(id: string, file: Blob): Promise<string>;
  deleteFile(...urls: string[]): Promise<void>;
}
