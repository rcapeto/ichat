import { Router } from 'express'
import multer from 'multer'
import { ensureUserIsAuthenticated } from '~/middlewares/ensureUserIsAuthenticated'
import { endpoints } from '~/routes/endpoints'
import { uploadUserImages } from '~/services/multer'
import { findMany } from './findMany'
import { update } from './update'

const multerPath = multer(uploadUserImages)

const userEndpoints = endpoints.app.user
export const userRoutes = Router()

userRoutes.get(userEndpoints.findMany, ensureUserIsAuthenticated, findMany)
userRoutes.put(
  userEndpoints.update,
  ensureUserIsAuthenticated,
  multerPath.single('file'),
  update,
)
