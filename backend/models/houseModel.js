import mongoose from 'mongoose';

const { Schema } = mongoose;

const houseSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
   // userRef: { type: String, required: true }, // Which user created the house data or infos
    userRef: { type: mongoose.Schema.Types.ObjectId, ref: 'User', }, 
    type: { type: String, required: true },
    regularPrice: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
    bathRooms: { type: Number, required: true },
    bedRooms: { type: Number, required: true },
    furnished: { type: Boolean, required: true },
    parking: { type: Boolean, required: true },
    offer: { type: Boolean, required: true },
    images: { type: Array, required: true },
  
  },
  { timestamps: true }
);

const House = mongoose.model('House', houseSchema);
export default House;
