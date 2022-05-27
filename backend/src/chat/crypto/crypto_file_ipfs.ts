const ipfsClient = require('ipfs-http-client');
const { globSource } = ipfsClient;
const ipfsEndPoint = 'http://localhost:5001';
const ipfs = ipfsClient(ipfsEndPoint);

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

export class CryptoFileIPFS {
  constructor() {}

  generateKeys() {
    if (fs.existsSync('private.pem') && fs.existsSync('public.pem')) return;

    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs1',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: '',
      },
    });

    fs.writeFileSync('private.pem', privateKey);
    fs.writeFileSync('public.pem', publicKey);
  }

  encryptRSA(toEncrypt, pubkeyPath = 'public.pem') {
    const absolutePath = path.resolve(pubkeyPath);
    const publicKey = fs.readFileSync(absolutePath, 'utf8');
    const buffer = Buffer.from(toEncrypt, 'utf8');
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString('base64');
  }

  decryptRSA(toDecrypt, privkeyPath = 'private.pem') {
    const absolutePath = path.resolve(privkeyPath);
    const privateKey = fs.readFileSync(absolutePath, 'utf8');
    const buffer = Buffer.from(toDecrypt, 'base64');
    const decrypted = crypto.privateDecrypt(
      {
        key: privateKey.toString(),
        passphrase: '',
      },
      buffer,
    );
    return decrypted.toString('utf8');
  }

  encryptAES(buffer, secretKey, iv) {
    const cipher = crypto.createCipheriv('aes-256-ctr', secretKey, iv);
    const data = cipher.update(buffer);
    const encrypted = Buffer.concat([data, cipher.final()]);
    return encrypted.toString('hex');
  }

  decryptAES(buffer, secretKey, iv) {
    const decipher = crypto.createDecipheriv('aes-256-ctr', secretKey, iv);
    const data = decipher.update(buffer);
    const decrpyted = Buffer.concat([data, decipher.final()]);
    return decrpyted;
  }

  async toArray(asyncIterator) {
    const arr = [];
    for await (const i of asyncIterator) {
      arr.push(i);
    }
    return arr;
  }

  async uploadFileEncrypted(file, ipfspath) {
    try {
      const buff = fs.readFileSync(file);
      const key = crypto.randomBytes(16).toString('hex'); // 16 bytes -> 32 chars
      const iv = crypto.randomBytes(8).toString('hex'); // 8 bytes -> 16 chars
      const ekey = this.encryptRSA(key); // 32 chars -> 684 chars
      const ebuff = this.encryptAES(buff, key, iv);

      const content = Buffer.concat([
        // headers: encrypted key and IV (len: 700=684+16)
        Buffer.from(ekey, 'utf8'), // char length: 684
        Buffer.from(iv, 'utf8'), // char length: 16
        Buffer.from(ebuff, 'utf8'),
      ]);

      await ipfs.files.write(ipfspath, content, {
        create: true,
        parents: true,
      });

      // Qmc6rvvQee6KXr9iToraKzRBeFrXMSeg4XbCsNwEVq49D1
      // ipfs.io/ipfs/Qmc6rvvQee6KXr9iToraKzRBeFrXMSeg4XbCsNwEVq49D1

      console.log('ENCRYPTION --------');
      console.log('key:', key, 'iv:', iv, 'ekey:', ekey.length);
      console.log('contents:', buff.length, 'encrypted:', ebuff.length);
      console.log(' ');
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async downloadFileEncrypted(ipfspath) {
    try {
      let file_data = await ipfs.files.read(ipfspath);

      let edata = [];
      for await (const chunk of file_data) edata.push(chunk);
      // edata = Buffer.concat(edata);
      const edata2 = Buffer.concat(edata);

      const key = this.decryptRSA(edata2.slice(0, 684).toString('utf8'));
      const iv = edata2.slice(684, 700).toString('utf8');
      const econtent = edata2.slice(700).toString('utf8');
      const ebuf = Buffer.from(econtent, 'hex');
      const content = this.decryptAES(ebuf, key, iv);

      console.log(' ');
      console.log('DECRYPTION --------');
      console.log('key:', key, 'iv:', iv);
      console.log('contents:', content.length, 'encrypted:', econtent.length);
      console.log('downloaded:', edata2.length);

      return content;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async getUploadedFiles(ipfspath = '/encrypted/') {
    let files = [];
    const arr = await this.toArray(ipfs.files.ls(ipfspath));
    for (let file of arr) {
      if (file.type === 'directory') {
        const inner = await this.getUploadedFiles(ipfspath + file.name + '/');
        files = files.concat(inner);
      } else {
        files.push({
          path: ipfspath + file.name,
          size: file.size,
          cid: file.cid.toString(),
        });
      }
    }
    return files;
  }
}
