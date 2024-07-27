const mongoose = require('mongoose');
const { z } = require('zod');

exports.astrologerCraeteSchema = z.object({
    name: z.string(),
    experience: z.number(),
    languages: z.array(z.string()).min(1),
    experties: z.array(z.string()).min(1),
    price: z.number().min(0),
    imageUrl: z.string().url(),
    bio: z.string().min(1000),
});

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);
const objectIdSchema = z.string().refine(isValidObjectId, {
    message: 'Invalid MongoDB ObjectId',
  });
  
exports.getFulldetailsOfastrologerSchems = z.object({
    id: objectIdSchema,
});

exports.deleteAstrologerSchema = z.object({
    id: objectIdSchema,
});

exports.updateAstrologerSchema = z.object({
    id: objectIdSchema,
    name: z.string().optional(),
    experience: z.number().optional(),
    languages: z.array(z.string()).min(1).optional(),
    experties: z.array(z.string()).min(1).optional(),
    price: z.number().min(0).optional(),
    imageUrl: z.string().url().optional(),
    bio: z.string().min(1000).optional(),
});
