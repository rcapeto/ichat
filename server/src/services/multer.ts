import multer from 'multer'
import path from 'node:path'
import { serverConfig } from '~/config/server'

const folders = serverConfig.uploadFolders

function createFilename(file: Express.Multer.File) {
  const filename = file.originalname
  const filenameWithoutWhiteSpace = filename.replace(/\s/g, '_')

  return `${Date.now()}-${filenameWithoutWhiteSpace}`
}

export const uploadMessageAssets = {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', folders.message),
    filename: (request, file, callback) => callback(null, createFilename(file)),
  }),
}

export const uploadUserImages = {
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', folders.users),
    filename: (request, file, callback) => callback(null, createFilename(file)),
  }),
}
