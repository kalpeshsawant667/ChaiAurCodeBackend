import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";

const generateAccessAndRefreshTokens = async(userId){
    const accessTokenExpiresIn = '15m'; // 15 minutes
    try{
        const user = await User.findById(userId)
        const accessToken= user.generateAccessToken
        const refreshToken= user.generateRefreshToken

        user.refreshToken = refreshToken
        user.save({validateBeforeSave: false})
        
        return {accessToken, refreshToken}
    }
    catch(error)
    {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }

}

const registerUser = asyncHandler(async(req, res)=>{
    const { fullname, email, username, password} = req.body
    if([fullname, email, username, password]
        .some((field)=> 
    field?.trim() ===""
    ))
    {
        throw new ApiError(400, "fullname cannot be empty")
    }

    const existedUser = User.findOne({
        $or: [{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"User with email or username already exists")
    }
    console.log(fullname, email, username, password)
})

const loginUser = async(async (req, res) => {
  const { email, username, password } = req.body;
  if (!username || !email) {
    throw new ApiError(400, "username or password is required"); 
  }

  
  const user = await User.findOne({
    $or: [{username}, {email}]
  })

  if(!user){
    throw new ApiError(404, " User does not exist")
  }

  const isPasswordValid = await user.isPasswordCorrect(password)

  if(!isPasswordValid){
    throw new ApiError(401, "Not Valid Password")
  }
  generateAccessAndRefreshTokens(user._id)

  const loggedInUser = await User.findById(user._id).
  select("-password -refreshToken")

  const options = {
    httpOnly: true,
    secure: true
  }

  return res.status(200)
  .cookie("accessToken",accessToken,options)
  .cookie("refreshToken",refreshToken,options)
  .json(
    new ApiResponse(
      200,
      {
        user:loggedInUser, accessToken,
        refreshToken
      },
      "User Logged in successful"
    )
  )
});

export {registerUser,loginUser} 