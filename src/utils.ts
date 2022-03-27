import { createCipheriv, createDecipheriv, randomBytes, scrypt } from "crypto";
import { promisify } from "util";

export class Utils {
    private static iv = randomBytes(16);
    private static secret = 'genkey';

    static async encrypt(password: string): Promise<string> {
        // The key length is dependent on the algorithm.
        // In this case for aes256, it is 32 bytes.
        const key = (await promisify(scrypt)(this.secret, 'salt', 32)) as Buffer;
        const cipher = createCipheriv('aes-256-ctr', key, this.iv);

        const encryptedText = Buffer.concat([
            cipher.update(password),
            cipher.final(),
        ]);

        return encryptedText.toString();
    }

    static async decrypt(hash: Buffer): Promise<string> {
        const key = (await promisify(scrypt)(this.secret, 'salt', 32)) as Buffer;
        const decipher = createDecipheriv('aes-256-ctr', key, this.iv);
        const decryptedText = Buffer.concat([
            decipher.update(hash),
            decipher.final(),
        ]);

        return decryptedText.toString();
    }
}