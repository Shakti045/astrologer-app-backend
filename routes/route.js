const { createastrologer, getAstrologers, getFulldetailsOfastrologer, deleteAstrologer, updateAstrologer, searchAstrologer } = require('../controllers/astrologer');
const { astrologerCraeteSchema, getFulldetailsOfastrologerSchems, deleteAstrologerSchema, updateAstrologerSchema } = require('../scheema/astrologer');

const router = require('express').Router();


const validate = (schema) => (req, res, next) => {
    try {
      const {body,querry,params} = req;
      schema.parse({...body,...querry,...params});
      next();
    } catch (e) {
      res.status(400).json({ error: e.errors });
    }
};



router.post('/astrologer/create',validate(astrologerCraeteSchema),createastrologer);
router.post('/getAstrologers',getAstrologers);
router.get('/astrologer/:id',validate(getFulldetailsOfastrologerSchems),getFulldetailsOfastrologer);
router.delete('/astrologer/:id',validate(deleteAstrologerSchema),deleteAstrologer);
router.put('/astrologer/:id',validate(updateAstrologerSchema),updateAstrologer);
router.get('/astrologer/search/:query',searchAstrologer);  

module.exports = router;