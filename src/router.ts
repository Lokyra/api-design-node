import { Router } from 'express'
import { body, validationResult, oneOf} from 'express-validator'
import { handleInputErrors } from './modules/middleware'
import { getOneProduct, getProducts, createProduct, deleteProduct, updateProduct } from './handlers/product'
import { getOneUpdate, getUpdates, createUpdate, deleteUpdate, updateUpdate } from './handlers/update'

const router = Router()

// Product
router.get('/product', getProducts)
router.get('/product/:id', getOneProduct)
router.put('/product/:id',body('name').isString(), handleInputErrors, updateProduct, (req, res) => {
})
router.post('/product', body('name').isString(), handleInputErrors, createProduct, (req, res) => {

})
router.delete('/product/:id', deleteProduct)


// Update
router.get('/update', getUpdates)
router.get('/update/:id', getOneUpdate)
router.put('/update/:id', 
   body('title').optional(), 
   body('body').optional(),
   body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
   body('version').optional(), updateUpdate)

router.post('/update', 
   body('title').exists().isString(),
   body('body').exists().isString(),
   createUpdate,
),
router.delete('/update/:id', deleteUpdate)


//Update Point
router.get('/updatepoint', () => {} )
router.get('/updatepoint/:id', () => {} )
router.put('/updatepoint/:id', 
           body('name').optional().isString(), 
           body('description').optional().isString(),
           () => {} 
)
router.post('/updatepoint', 
           body('name').isString(), 
           body('description').isString(),
           body('updateId').exists().isString(),
            () => {} 
)
router.delete('/updatepoint/:id', () => {} )



export default router
