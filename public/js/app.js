//Chat box feature using Pusher

const pusher = new Pusher('b2ffc19f607b5757415d', {
    cluster: 'us2',
    encrypted: true,
    authEndpoint: 'pusher/auth'
});
const app = new Vue({
    el: '#app',
    data: {
        joined: false,
        username: '',
        members: '',
        newMessage: '',
        messages: [],
        status: ''
    },
    methods: {
        joinChat() {  console.log(this.username)
            axios.post('/join-chat', {username: this.username})
                .then(response => {
                    // User has joined the chat
                    this.joined = true;
                    const channel = pusher.subscribe('presence-groupChat');
                    channel.bind('pusher:subscription_succeeded', (members) => {
                        this.members = channel.members;
                    });
                    // User joins chat
                    channel.bind('pusher:member_added', (member) => {
                        this.status = `${member.id} joined the chat`;
                    });
                    // Listen for chat messages
                    this.listen();
                });
        },
        sendMessage() { 
            let message = {
                username: this.username,
                message: this.newMessage
            }
            console.log(this.newMessage)
            // Clear input field
            this.newMessage = '';
            axios.post('/send-message', message);
        },
        listen() {
            const channel = pusher.subscribe('presence-groupChat');
            channel.bind('message_sent', (data) => {
                console.log(data);
                this.messages.push({
                    username: data.username,
                    message: data.message
                });
            });
        }
    }
});