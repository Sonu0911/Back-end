const  userModel=require("../model/userModel")
// const bcrypt=require('bcrypt')
const createUser = async function(req, res) {
    try {
        let data = req.body

        if (Object.keys(data) == 0) return res.status(400).send({ status: false, msg: "No input provided" })

        const { email, Password } = data

      
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return res.status(400).send({ status: false, msg: "valid email is required" })
        }

        if (!Password) {
            return res.status(400).send({ status: false, msg: "Plz enter valid Password" })
        }

        let dupliEmail = await userModel.find({ email: email })
        if (dupliEmail.length > 0) {
            return res.status(400).send({ status: false, msg: "email is already exists" })
        }

        let savedData = await userModel.create(data)
        res.status(201).send({
            status: true,
            msg: "user created successfully",
            msg2: savedData
        })

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

const getUser=async function(req,res){
    try{
          let data=req.body

          const { email, Password } = data

          const findUser=await userModel.findOne({email:email,Password:Password})
          if(!findUser){
              return res.status(400).send({status:false,msg:"user is not found please enter correct credintials"})
          }

          return res.status(200).send({status:true,msg:"user found",data:findUser})


    }catch(error){
        return res.status(500).send({status:false,msg:error.message})
    }
}


const updateUser=async function (req,res){
    try{
         
        let data=req.body

          const { email, Password } = data

          const findUser=await userModel.findOne({email:email,Password:Password})
          if(!findUser){
              return res.status(400).send({status:false,msg:"user is not found please enter correct credintials"})
          }
        
          let updateUser=await userModel.findOneAndUpdate({email:email,Password:Password},data,{new:true})

          return res.status(200).send({status:true,msg:updateUser})

    }catch(error){
        return res.status(500).send({status:false,msg:error.msg})
    }
}


const deleteUser=async function(req,res){
    try{
        let data=req.body
        
        const { _id, email } = data
        

        let findUser = await userModel.findOne({$or:[{_id:_id},{email:email}]})
       
        if(!findUser){
            return res.status(400).send({status:false,msg:"user is not found"})
        }
        if (findUser.isDeleted == true) {
            return res.status(404).send({ status: false, msg: "user is already deleted" })
        }

        let deleted=await userModel.findOneAndUpdate({$or:[{_id:_id},{email:email}]},{isDeleted: true} , { new: true })
       
        return res.status(200).send({status:true,msg:"user deleted",data:deleted})


    }catch(error){
        return res.status(500).send({status:false,msg:error.message})
    }
}




module.exports.createUser = createUser
module.exports.getUser=getUser
module.exports.updateUser=updateUser
module.exports.deleteUser=deleteUser