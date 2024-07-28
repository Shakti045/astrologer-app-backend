const Astrologer = require('../model/astrologer');

exports.createastrologer = async (req, res) => {
    try {
        const {name,experience,languages,experties,price,imageUrl,bio} = req.body
        const astrologer = new Astrologer({
            name,
            experience,
            languages,
            experties,
            price,
            imageUrl,
            bio,
            createdAt: Date.now()
        });
        const astrologerwithsameName = await Astrologer.findOne({name});
        if(astrologerwithsameName){
            return res.status(400).json({success:false,message: 'Astrologer with this name already exists'});
        }
        await astrologer.save();
        res.status(200).json({success:true,message: 'Astrologer created successfully'});
    } catch (error) {
        console.log('Failed to create astroger', error);
        res.status(500).json({success:false,message: 'Failed to create astroger'});
    }
}

exports.getAstrologers = async (req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        if(page<1){
            return res.status(400).json({success:false,message: 'Invalid page number'});
        }
        if(limit<1){
            return res.status(400).json({success:false,message: 'Invalid limit number'});
        }

        const {filters} = req.body;
        const sortby = {};
        switch (filters?.sortvalue) {
            case 1:
                sortby.experience = -1;
                break;
            case 2:
                sortby.experience = 1;
                break;
            case 3:
                sortby.price = -1;
                break;
            case 4:
                sortby.price = 1;
                break;
            case 0:
            default:
                sortby.createdAt = -1;
                break;
        }
        sortby.createdAt = -1;
        const filter = {};
        if(Array.isArray(filters?.experties) && filters?.experties.length>0){
            filter.experties = {$in:filters.experties};
        }
        if(Array.isArray(filters?.languages) && filters?.languages.length>0){
            filter.languages = {$in:filters.languages};
        }

        const skip = (page-1)*limit;
        const astrologers = await Astrologer.find(filter,{bio:0}).sort(sortby).skip(skip).limit(limit);
        const hasMore = await Astrologer.find(filter,{bio:0}).skip(skip+limit).limit(1).countDocuments()===1;
        res.status(200).json({success:true,astrologers,hasMore});
    } catch (error) {
        console.log('Failed to get astroger', error);
        res.status(500).json({success:false,message: 'Failed to get astroger'});
    }
}


exports.getFulldetailsOfastrologer = async (req,res)=>{
    try {
        const astrologer = await Astrologer.findById(req.params.id);
        if(!astrologer){
            return res.status(404).json({success:false,message: 'Astrologer not found'});
        }
        res.status(200).json({success:true,astrologer});
    } catch (error) {
        console.log('Failed to get astroger', error);
        res.status(500).json({success:false,message: 'Failed to get astroger'});
    }
}


exports.deleteAstrologer = async (req,res)=>{
    try {
        const astrologer = await Astrologer.findByIdAndDelete(req.params.id);
        if(!astrologer){
            return res.status(404).json({success:false,message: 'Astrologer not found'});
        }
        res.status(200).json({success:true,message: 'Astrologer deleted successfully'});
    } catch (error) {
        console.log('Failed to delete astroger', error);
        res.status(500).json({success:false,message: 'Failed to delete astroger'});
    }
}


exports.updateAstrologer = async (req,res)=>{
    try {
        const astrologer = await Astrologer.findById(req.params.id);
        if(!astrologer){
            return res.status(404).json({success:false,message: 'Astrologer not found'});
        }
        const {name,experience,languages,experties,price,imageUrl,bio} = req.body;
        if(!name && !experience && !languages && !experties && !price && !imageUrl && !bio){
            return res.status(400).json({success:false,message: 'Atleast one field is required to update'});
        }
        if(name){
            astrologer.name = name;
        }
        if(experience){
            astrologer.experience = experience;
        }
        if(languages){
            astrologer.languages = languages;
        }
        if(experties){
            astrologer.experties = experties;
        }
        if(price){
            astrologer.price = price;
        }
        if(imageUrl){
            astrologer.imageUrl = imageUrl;
        }
        if(bio){
            astrologer.bio = bio;
        }
        await astrologer.save();
        res.status(200).json({success:true,message: 'Astrologer updated successfully'});
    } catch (error) {
        console.log('Failed to update astroger', error);
        res.status(500).json({success:false,message: 'Failed to update astroger'});
    }
}


exports.searchAstrologer = async (req,res)=>{
    try {
        const {query} = req.params;
        if(!query){
            return res.status(400).json({success:false,message: 'Search query is required'});
        }
        const regex = new RegExp(query, 'i');
        const astrologers = await Astrologer.find({name:regex},{bio:0});
        res.status(200).json({success:true,astrologers});
    } catch (error) {
        console.log('Failed to search astroger', error);
        res.status(500).json({success:false,message: 'Failed to search astroger'});
    }
}