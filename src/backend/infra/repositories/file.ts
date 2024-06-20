import { IFileRepository } from "@backend/app/repositories/file";
import { del, put } from "@vercel/blob";
import fs from "fs/promises";

export class FileRepository implements IFileRepository {
  async uploadFile(id: string, filePath: string): Promise<string> {
    const blob = await fs.readFile(filePath);
    const result = await put(id, blob);
    return result.pathname;
  }

  async deleteFile(id: string): Promise<void> {
    await del(id);
  }
}

// import { IFileRepository } from "@backend/app/repositories/file";
// import { readFile } from "fs/promises";
// import { join } from "path";

// const UPLOAD_TOKEN = process.env.UPLOAD_TOKEN as string;
// const UPLOAD_URL = process.env.UPLOAD_URL as string;

// export class FileRepository implements IFileRepository {
//   async uploadFile(id: string, filePath: string): Promise<string> {
//     const url = new URL(UPLOAD_URL);
//     url.pathname = join("files", `${id}.jpg`);
//     url.searchParams.append("token", UPLOAD_TOKEN);
//     const buffer = await readFile(filePath);
//     const blob = new Blob([buffer]);
//     const form = new FormData();
//     form.append("file", blob);
//     const response = await fetch(url, { method: "PUT", body: form });
//     const body = (await response.json()) as { ok: boolean; path: string };

//     return body.path;
//   }

//   async deleteFile(id: string): Promise<void> {
//     return Promise.resolve(undefined);
//   }
// }
