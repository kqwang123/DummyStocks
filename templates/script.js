const button = document.getElementById('button');

// Add an event listener to the button
button.addEventListener('click', async function () {
    const data = {
        keywords: "Tesla+financial"
    };

    const queryString = new URLSearchParams(data).toString();

    try {
        // Send the GET request
        let response = await fetch(`http://127.0.0.1:5000/search?${queryString}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',  // Optional, since GET doesn't usually send JSON in the body
            },
        });

        const result = await response.json();

        if (response.ok) {
            console.log(result);
        } else {
            console.error("Error fetching articles");
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
