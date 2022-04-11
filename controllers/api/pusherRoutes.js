//Pusher dependencies
const router = require('express').Router();
require('dotenv').config();

router.listen(3000, () => {
    console.log('Server is up on 3000')
});

router.post('/join-chat', (req, res) => {
    // store username in session
    req.session.username = req.body.username;
    res.json('Joined');
});

router.post('/pusher/auth', (req, res) => {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    // Retrieve username from session and use as presence channel user_id
    const presenceData = {
        user_id: req.session.username
    };
    const auth = pusher.authenticate(socketId, channel, presenceData);
    res.send(auth);
});

router.post('/send-message', (req, res) => {
    pusher.trigger('presence-groupChat', 'message_sent', {
        username: req.body.username,
        message:  req.body.message
    });
    res.send('Message sent');
});
