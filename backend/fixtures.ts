import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Post from './models/Post';
import Comment from './models/Comment';


const run = async () => {
  await mongoose.connect(config.database);
  const db = mongoose.connection;
  try {
    await db.dropCollection('users');
    await db.dropCollection('posts');
    await db.dropCollection('comments');
  } catch (err) {
    console.log('skipping drop');
  }
  const firstUser = new User({
    username: 'user',
    password: 'user',
  });
  firstUser.generateToken();
  await firstUser.save();
  const secondUser = new User({
    username: 'admin',
    password: 'admin',
  });
  secondUser.generateToken();
  await secondUser.save();
  const thirdUser = new User({
    username: 'test',
    password: 'test',
  });
  thirdUser.generateToken();
  await thirdUser.save();

  const [firstPost,
    secondPost,
    thirdPost,
    fourthPost,
    fivesPost,
    sixthPost] = await Post.create(
    {
      title: '1t Test post without image',
      author: firstUser,
      description: 'This is small test description to post without image',
      image: null,
      date: new Date('2023-12-31T01:15:14.448+00:00'),
    },
    {
      title: '2d Test post without description',
      author: firstUser,
      image: 'fixtures/pepe.png',
      date: new Date('2024-09-17T01:15:14.448+00:00'),
    },
    {
      title: '3d Full Test post ',
      author: secondUser,
      description: 'This is small test description to full post with image and description',
      image: 'fixtures/face.png',
      date: new Date('2024-09-19T00:19:14.448+00:00'),
    },
    {
      title: '4th Full Test post ',
      author: secondUser,
      description: 'This is medium test description to full post with image and description, This is medium test description to full post with image and description, This is medium test description to full post with image and description',
      image: 'fixtures/luffy.jpg',
      date: new Date('2024-09-19T01:15:14.448+00:00'),
    },
    {
      title: '5th Full Test post ',
      author: thirdUser,
      description: 'This is medium test description to full post with image and description, This is medium test description to full post with image and description, This is medium test description to full post with image and description',
      image: 'fixtures/pepecry.png',
      date: Date.now() - 86400000,
    },
    {
      title: '6th Full Test post ',
      author: thirdUser,
      description: 'This is large test description to full post with image and description, This is large test description to full post with image and description, This is large test description to full post with image and description, This is large test description to full post with image and description, This is large test description to full post with image and description, This is large test description to full post with image and description, This is large test description to full post with image and description',
      image: 'fixtures/pepefrog.png',
      date: Date.now() - 54000000,
    }
  );

  await Comment.create(
    {
      post: firstPost,
      author: firstUser,
      message: 'First test message',
      date: new Date('2023-12-31T11:15:14.448+00:00'),
    },
    {
      post: firstPost,
      author: secondUser,
      message: 'Second test message',
      date: new Date('2024-06-20T11:15:14.448+00:00'),
    },
    {
      post: firstPost,
      author: thirdUser,
      message: 'Third test message',
      date: new Date('2024-08-31T14:15:14.448+00:00'),
    },
    {
      post: secondPost,
      author: firstUser,
      message: 'First test message',
      date: new Date('2024-09-18T01:15:14.448+00:00'),
    },
    {
      post: secondPost,
      author: secondUser,
      message: 'Second test message',
      date: new Date('2024-09-18T01:15:14.448+00:00'),
    },
    {
      post: secondPost,
      author: thirdUser,
      message: 'Third test message',
      date: new Date('2024-09-21T01:15:14.448+00:00'),
    },
    {
      post: thirdPost,
      author: firstUser,
      message: 'First test message',
      date: new Date('2024-09-20T04:15:14.448+00:00'),
    },
    {
      post: thirdPost,
      author: secondUser,
      message: 'Second test message',
      date: new Date('2024-09-20T04:22:14.448+00:00'),
    },
    {
      post: thirdPost,
      author: thirdUser,
      message: 'Third test message',
      date: new Date('2024-09-21T01:15:14.448+00:00'),
    },
    {
      post: fourthPost,
      author: firstUser,
      message: 'First test message',
      date: new Date('2024-09-20T04:30:14.448+00:00'),
    },
    {
      post: fourthPost,
      author: secondUser,
      message: 'Second test message',
      date: new Date('2024-09-20T04:35:14.448+00:00'),
    },
    {
      post: fourthPost,
      author: thirdUser,
      message: 'Third test message',
      date: new Date('2024-09-21T00:15:14.448+00:00'),
    },
    {
      post: fivesPost,
      author: firstUser,
      message: 'First test message',
      date: Date.now() - 54400000,
    },
    {
      post: fivesPost,
      author: secondUser,
      message: 'Second test message',
      date: Date.now() - 50000000,
    },
    {
      post: fivesPost,
      author: thirdUser,
      message: 'Third test message',
      date: Date.now() - 47700000,
    },
    {
      post: sixthPost,
      author: firstUser,
      message: 'First test message',
      date: Date.now() - 27700000,
    },
    {
      post: sixthPost,
      author: secondUser,
      message: 'Second test message',
      date: Date.now() - 26700000
    },
    {
      post: sixthPost,
      author: thirdUser,
      message: 'Third test message',
      date: Date.now() - 20000000
    },
  );
  await db.close();
};
run().catch(console.error);