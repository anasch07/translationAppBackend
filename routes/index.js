const {addTranslation, getAllTranslations, getTranslationById, updateTranslationByIdAndWordInEnglish, deleteTranslationByTranslationId,deleteTranslationByIdAndWordInEnglish, deleteAllTranslationsByWordInEnglish} = require("../controllers/translationController.js");






const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController')

router.get('/', indexController.index);
router.get('/translate', indexController.trans);
router.post('/addTranslation', addTranslation);
router.get('/getAllTranslations', getAllTranslations);
router.get('/getTranslationById/:id', getTranslationById);
router.put('/updateTranslationByIdAndWordInEnglish', updateTranslationByIdAndWordInEnglish);
router.delete('/deleteTranslationByTranslationId/:id', deleteTranslationByTranslationId);
router.delete('/deleteTranslationByIdAndWordInEnglish/:id', deleteTranslationByIdAndWordInEnglish);
router.delete('/deleteAllTranslationsByWordInEnglish/:wordInEnglish', deleteAllTranslationsByWordInEnglish);






module.exports = router;