import UserSchema from '@/models/user';
import { withAuth } from '@/utils/auth';

async function handler(req, res) {
  if(req.method !== 'PUT') return res.status(400).json({ message: 'method not allowed' })
  try {
    const _user = await UserSchema.findOneAndUpdate(
      { uid: req.user.uid },
      req.body,
    );
    res.status(200).json({ message: 'user updated', _user });
  } catch (err) {
    res.status(400).json({ message: 'error', err });
  }
}

export default withAuth(handler);
