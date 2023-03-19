import  requestSchema  from '@/models/request';
import userSchema from '@/models/user'
import { withAuth } from '@/utils/auth';

async function handler(req, res) {
  if(req.method !== 'POST') return res.status(400).json({ message: 'method not allowed' })
  try {
    const  user = await userSchema.findOne({uid:req.user.uid})
    if(user._id==req.body.sender._id){
    let request = new requestSchema(
      req.body,
    );
    
    request = await request.save()
    console.log(request)
    const ress=  await userSchema.updateOne(
      { uid: req.body.receiver.uid}, 
      { $push: { 'invites':  request._id }}
  );
  console.log(ress)
  const ress1 = await userSchema.updateOne(
    { uid: req.body.sender.uid}, 
    { $push: { 'invites':  request._id  } }
);
    console.log(ress1)
    res.status(200).json({ message: 'request created', request});
    }
    else{
      res.status(400).json("not authorised")
    }
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: 'error', err });
  }
}

export default withAuth(handler);