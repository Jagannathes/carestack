import  requestSchema  from '@/models/request';
import userModel from '@/models/user'
import { withAuth } from '@/utils/auth';

async function handler(req, res) {
  if(req.method !== 'PUT') return res.status(400).json({ message: 'method not allowed' })
  try {
    const request = await requestSchema.findOneAndUpdate(
        { _id: req.body._id },
      { $set: { status: req.body.status } },
    );
    if(req.body.status=="accepted"){
   await userModel.updateOne(
      { _id: req.body.receiver._id}, 
      { $push: { friends: req.body.sender._id } ,
       $pull: { 'invites':  req.body._id  } }
  );
    userModel.updateOne(
      { _id: req.body.sender._id }, 
      { $push: { friends: req.body.receiver._id } ,
       $pull: { 'invites':  req.body._id  } }
  );
    }
    else{
      userModel.updateOne(
        { _id: req.body.receiver._id, uid:req.user.uid }, 
        { $pull: { 'invites': req.body._id } }
    );
      userModel.updateOne(
        { _id: req.body.sender._id },
        { $pull: { 'invites': req.body._id } }
    );
      }
    res.status(200).json({ message: 'request set', request });
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: 'error', err });
  }
}

export default withAuth(handler);