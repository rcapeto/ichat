import { Router } from 'express'
import multer from 'multer'
import { ensureUserIsAuthenticated } from '~/middlewares/ensureUserIsAuthenticated'
import { endpoints } from '~/routes/endpoints'
import { uploadMessageAssets } from '~/services/multer'
import { create } from './create'

const multerPath = multer(uploadMessageAssets)
const messagesEndpoint = endpoints.app.message
export const messagesRoutes = Router()

messagesRoutes.post(
  messagesEndpoint.create,
  ensureUserIsAuthenticated,
  multerPath.single('messageAsset'),
  create,
)
