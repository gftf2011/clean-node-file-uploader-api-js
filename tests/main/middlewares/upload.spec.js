const express = require('express');
const fs = require('fs');

const request = require('supertest');

jest.mock('../../../src/main/config/routes', () => jest.fn());

const path = require('path');

const server = require('../../../src/main/server');

const upload = require('../../../src/main/middlewares/upload');

describe('Upload Middleware', () => {
  it('Should upload PNG file', async () => {
    const dirPath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'temp',
      'uploads',
    );
    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'public',
      'test',
      'test-image.png',
    );

    server.post(
      '/api/test-file-parser',
      express.static(dirPath),
      upload.single('file'),
      (req, res) => {
        const { originalname, filename } = req.file;
        res.json({ originalname, filename });
      },
    );
    const response = await request(server)
      .post('/api/test-file-parser')
      .attach('file', filePath)
      .set('Content-Type', 'multipart/form-data');

    expect(response.status).toBe(200);
    expect(
      fs.existsSync(path.join(dirPath, JSON.parse(response.text).filename)),
    ).toBe(true);
    expect(JSON.parse(response.text).originalname).toBe(
      path.basename(filePath),
    );
  });

  it('Should upload GIF file', async () => {
    const dirPath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'temp',
      'uploads',
    );
    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'public',
      'test',
      'test-image.gif',
    );

    server.post(
      '/api/test-file-parser',
      express.static(dirPath),
      upload.single('file'),
      (req, res) => {
        const { originalname, filename } = req.file;
        res.json({ originalname, filename });
      },
    );
    const response = await request(server)
      .post('/api/test-file-parser')
      .attach('file', filePath)
      .set('Content-Type', 'multipart/form-data');

    expect(response.status).toBe(200);
    expect(
      fs.existsSync(path.join(dirPath, JSON.parse(response.text).filename)),
    ).toBe(true);
    expect(JSON.parse(response.text).originalname).toBe(
      path.basename(filePath),
    );
  });

  it('Should upload JPG file', async () => {
    const dirPath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'temp',
      'uploads',
    );
    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'public',
      'test',
      'test-image.jpg',
    );

    server.post(
      '/api/test-file-parser',
      express.static(dirPath),
      upload.single('file'),
      (req, res) => {
        const { originalname, filename } = req.file;
        res.json({ originalname, filename });
      },
    );
    const response = await request(server)
      .post('/api/test-file-parser')
      .attach('file', filePath)
      .set('Content-Type', 'multipart/form-data');

    expect(response.status).toBe(200);
    expect(
      fs.existsSync(path.join(dirPath, JSON.parse(response.text).filename)),
    ).toBe(true);
    expect(JSON.parse(response.text).originalname).toBe(
      path.basename(filePath),
    );
  });

  it('Should upload JPEG file', async () => {
    const dirPath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'temp',
      'uploads',
    );
    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'public',
      'test',
      'test-image.jpeg',
    );

    server.post(
      '/api/test-file-parser',
      express.static(dirPath),
      upload.single('file'),
      (req, res) => {
        const { originalname, filename } = req.file;
        res.json({ originalname, filename });
      },
    );
    const response = await request(server)
      .post('/api/test-file-parser')
      .attach('file', filePath)
      .set('Content-Type', 'multipart/form-data');

    expect(response.status).toBe(200);
    expect(
      fs.existsSync(path.join(dirPath, JSON.parse(response.text).filename)),
    ).toBe(true);
    expect(JSON.parse(response.text).originalname).toBe(
      path.basename(filePath),
    );
  });
});
