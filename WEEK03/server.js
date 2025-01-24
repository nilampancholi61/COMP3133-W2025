
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Group Chat</title>
    <script src="/socket.io/socket.io.js"></script>
</head>
<body>
    <script>
        const ioClient = io()

        ioClient.on('connect', () => {
            document.getElementById('socketID').innerHTML = ioClient.id;
        })

        function joinGroup() {
            const groupRadio = document.querySelector('input[name="group"]:checked');
            const groupName = groupRadio.value
            ioClient.emit('join_group', groupName)
        }

        function leaveGroup() {
            const groupRadio = document.querySelector('input[name="group"]:checked');
            const groupName = groupRadio.value
            ioClient.emit('leave_group', groupName)
        }

        function sendGroupMessage() {
            const txtmessage = document.getElementById('message');
            const message = txtmessage.value
            const data = {
                group: document.querySelector('input[name="group"]:checked').value,
                message
            }
            ioClient.emit('group_message', data)
        }

        ioClient.on('group_message', (data) => {
            const container = document.getElementById('container');
           
            
            const senderId = data.senderId
            const message = data.message

            const msg =  `<p><b>${senderId}:</b>${message}</p>`;
            
            container.innerHTML += msg
        })

    </script>
    
    <h1>Group Chat</h1>
    <h4 id="socketID"></h4>
    <input type="radio" id="group1" name="group" value="news">News <br />
    <input type="radio" id="group2" name="group" value="sports">Sports <br />
    <button onclick="joinGroup()">Join Group</button>
    <input type="text" id="message" name="message" placeholder="Enter your message" />
    <button onclick="sendGroupMessage()">Sent Message</button>
    <h3>Chat History</h3>
    <div id="container" name="container">
    
    </div>
    <button onclick="leaveGroup()">Leave Group</button>
</body>
</html>