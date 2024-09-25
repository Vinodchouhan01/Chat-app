import Conversation from './../models/conversationmodel.js';
import Message from './../models/message.js' ;

export const sendmessage = async (req , res) =>{
    try {
        const{message} = req.body ;
        const {id : receiverId} = req.params ;
        const senderId = req.user._id  ;
    
        let conversation = await Conversation.findOne({
            participants : {$all : [senderId , receiverId]},
        })
        
        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId , receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message ,
        })
        
        if (Array.isArray(conversation.message)) {
            conversation.message.push(newMessage._id);
        } else {
            conversation.message = [newMessage._id];
        }
        console.log(newMessage._id)  ;
        
        // await newMessage.save();
        // await conversation.save() ;
        await Promise.all([conversation.save() , newMessage.save()]) ;
        res.status(201).json({conversation}) ;
       
    } catch (error) {
        res.status(500).json({error : "internal error in send message"})
    }
}

export const getMessage = async (req , res) =>{
     try {
        const {id : receiverId} = req.params ;
        const senderId = req.user._id ; // no need to use curly braces when you are getting directly id 
        
        const conversation  = await Conversation.findOne({
            participants :{$all : [senderId   , receiverId]},
        }).populate("message") ;
         
        if(!conversation){
            return res.status(400).json({message : "no conversation found"})
        }
        const message = conversation.message
  
        res.status(200).json(message) ;


     } catch (error) {
        res.status(500).json({error : "internal error in getting message"})
     }
}
 