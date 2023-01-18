/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */
const mongoose = require("mongoose");

const translationSchema = mongoose.Schema(
    {

       Word_ID: { type: String,
            required: true,
        },
        comment: {
            type: String,
        },

        wordInEnglish: { type: String,
            required: true
        },
        wordInFrench: { type: String,
            required: true
        },
        wordInGerman: { type: String,
            required: true
        },
        wordInSpanish: { type: String,
            required: true
        },
        wordInKorean: { type: String,
            required: true
        },
        wordInJapanese: { type: String,
            required: true
        },
        wordInPortuguese: { type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
);

const Translation = mongoose.model('Translation', translationSchema);

module.exports = Translation;