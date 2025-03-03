import jwt from 'jsonwebtoken'; 
import usermodel from '../models/user.model.js';

const generatedRefreshToken = async (userId) => {
    const token = await jwt.sign(
        { id: userId },
        process.env.SECRET_KEY_ACCESS_TOKEN, 
        { expiresIn: '7d' }
    );

    const updateRefreshTokenUser=await usermodel.updateOne(
        {_id:userId},
        {
            referesh_token:token
        }
    )
    return token;
};

export default generatedRefreshToken;
