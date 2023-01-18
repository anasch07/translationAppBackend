/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const asyncHandler = require("express-async-handler");
const Translation = require("../Models/translation.js");

/* -------------------------------------------------------------------------- */
/*                               User Actions  Controller                              */
/* -------------------------------------------------------------------------- */

     const addTranslation = (
    asyncHandler(async (req, res) => {

        if (!req.body) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
        }

        if(!req.body.Word_ID || !req.body.wordInEnglish || !req.body.wordInFrench || !req.body.wordInGerman || !req.body.wordInSpanish || !req.body.wordInKorean || !req.body.wordInJapanese || !req.body.wordInPortuguese){
            res.status(400).send({ message: "Please fill all fields!" });
            return;
        }

        const { Word_ID, comment, wordInEnglish, wordInFrench, wordInGerman, wordInSpanish, wordInKorean, wordInJapanese, wordInPortuguese } = req.body;


        //check inputs


        // check if a translation with the same Word_ID  and wordInEnglish already exists
        const translationExists = await Translation.findOne({ Word_ID, wordInEnglish });

        if (translationExists) {
            res.status(400).send({ message: "A translation with the same Word_ID and wordInEnglish already exists!" });
            return;
        }

        // create a new translation and save it in the database

        const translation = await Translation.create({
            Word_ID,
            comment,
            wordInEnglish,
            wordInFrench,
            wordInGerman,
            wordInSpanish,
            wordInKorean,
            wordInJapanese,
            wordInPortuguese
        });
            if (translation) {
                        res.status(201).json({
                            _id: translation._id,
                            Word_ID: translation.Word_ID,
                            comment: translation.comment,
                            wordInEnglish: translation.wordInEnglish,
                            wordInFrench: translation.wordInFrench,
                            wordInGerman: translation.wordInGerman,
                            wordInSpanish: translation.wordInSpanish,
                            wordInKorean: translation.wordInKorean,
                            wordInJapanese: translation.wordInJapanese,
                            wordInPortuguese: translation.wordInPortuguese,
                        });
            } else {
                        res.status(400);
                        throw new Error("Invalid translation data");

            }
    })
);

 const getAllTranslations = (
    asyncHandler(async (req, res) => {
        const translations = await Translation.find({});
        res.json(translations);
    }
    )
);


 const getTranslationById = (
    asyncHandler(async (req, res) => {


        //find by Word_ID
        const translation = await Translation.find({ Word_ID: req.params.id })
        if (translation && translation.length > 0) {
            res.json(translation);
        }
        else {
            res.status(404).json({ message: "Translation not found" });
        }
    })
);


 const updateTranslationByIdAndWordInEnglish = (
    asyncHandler(async (req, res) => {
        const { Word_ID, comment, wordInEnglish, wordInFrench, wordInGerman, wordInSpanish, wordInKorean, wordInJapanese, wordInPortuguese } = req.body;
        const translation = await Translation.findOne
        ({ Word_ID, wordInEnglish });
        if (translation) {
            translation.Word_ID = Word_ID || translation.Word_ID;
            translation.comment = comment || translation.comment;
            translation.wordInEnglish = wordInEnglish || translation.wordInEnglish;
            translation.wordInFrench = wordInFrench || translation.wordInFrench;
            translation.wordInGerman = wordInGerman || translation.wordInGerman;
            translation.wordInSpanish = wordInSpanish || translation.wordInSpanish;
            translation.wordInKorean = wordInKorean || translation.wordInKorean;
            translation.wordInJapanese = wordInJapanese || translation.wordInJapanese;
            translation.wordInPortuguese = wordInPortuguese || translation.wordInPortuguese;
            const updatedTranslation = await translation.save();
            res.json({
                _id: updatedTranslation._id,
                Word_ID: updatedTranslation.Word_ID,
                comment: updatedTranslation.comment,
                wordInEnglish: updatedTranslation.wordInEnglish,
                wordInFrench: updatedTranslation.wordInFrench,
                wordInGerman: updatedTranslation.wordInGerman,
                wordInSpanish: updatedTranslation.wordInSpanish,
                wordInKorean: updatedTranslation.wordInKorean,
                wordInJapanese: updatedTranslation.wordInJapanese,
                wordInPortuguese: updatedTranslation.wordInPortuguese,
            });
        }
        else {
            res.status(404);
            throw new Error("Translation not found");
        }
    }
    )
);

 const deleteTranslationByTranslationId = (
    asyncHandler(async (req, res) => {

        //check the input
        if (!req.params.id) {
            res.status(400).send({ message: "Content can not be empty!" });
            return;
        }
        //check the input for correct format
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            res.status(400).send({ message: "Invalid ID format!" });
            return;
        }


        const translation = await Translation.findById(req.params.id);
        if (translation) {
            await translation.remove();
            res.json({ message: "Translation removed" });
        }
        else {
            res.status(404).json({ message: "Translation not found" });
        }
    })
);



 const deleteTranslationByIdAndWordInEnglish = (
    asyncHandler(async (req, res) => {
        const { Word_ID, wordInEnglish } = req.body;
        const translation = await Translation.findOne({ Word_ID, wordInEnglish });
        if (translation) {
            await translation.remove();
            res.json({ message: "Translation removed" });
        }
        else {
            res.status(404).json({ message: "Translation not found" });
        }
    }
    )
);

 const deleteAllTranslationsByWordInEnglish = (
    asyncHandler(async (req, res) => {
        const { wordInEnglish } = req.body;
        const translations = await Translation.find({ wordInEnglish });
        if (translations) {
            await Translation.deleteMany({ wordInEnglish });
            res.json({ message: "All translations removed" });
        }
        else {
            res.status(404);
            throw new Error("Translation not found");
        }
    }
    )
);


module.exports = {
    addTranslation,
    getAllTranslations,
    getTranslationById,
    updateTranslationByIdAndWordInEnglish,
    deleteTranslationByIdAndWordInEnglish,
    deleteAllTranslationsByWordInEnglish,
    deleteTranslationByTranslationId
};




