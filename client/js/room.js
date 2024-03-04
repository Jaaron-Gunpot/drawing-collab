window.onload = () => {
    const room = document.getElementById('room');
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('room', room.value);
        fetch(`/room?room=${room.value}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    //we are good, send them to the room
                    window.location.href = `/canvas`;
                    //save the room name so the next page knows what name to use
                    localStorage.setItem('room', room.value);
                } else {
                    //the room does not exist, ask if they want to create a new one
                    //based on 'https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm' example
                    if (window.confirm('Room does not exist, would you like to create it?')) {
                        fetch(`/createRoom`,
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ roomName: room.value }),
                            }
                        )
                            .then((response) => {
                                //if the room was created, send them to the room
                                if (response.status === 201) {
                                    //we are good, send them to the room
                                    window.location.href = `/canvas`;
                                    //save the room name so the next page knows what name to use
                                    localStorage.setItem('room', room.value);
                                }
                            });
                    }
                }
            });
        return false;
    });
};