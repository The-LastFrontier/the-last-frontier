const serverCode = 'bo9pg8';

async function getPlayerCount() {
    const status = document.getElementById("server-status");
    const playerCount = document.getElementById("player-count");
    const statusDot = document.getElementById("status-dot");

    try {
        const response = await fetch(
            `https://servers-frontend.fivem.net/api/servers/single/${serverCode}`
        );

        if (!response.ok) {
            throw new Error("Server not found");
        }

        const data = await response.json();

        const players = data.Data?.clients ?? 0;
        const maxPlayers = data.Data?.sv_maxclients ?? 0;

        status.textContent = "ONLINE";
        playerCount.textContent = `${players} / ${maxPlayers} Players`;

        status.style.color = "#72c472";
        statusDot.style.background = "#72c472";
        statusDot.style.boxShadow = "0 0 10px #72c472";

    } catch (error) {

        status.textContent = "OFFLINE";
        playerCount.textContent = "Server is currently unavailable";

        status.style.color = "#c45c5c";
        statusDot.style.background = "#c45c5c";
        statusDot.style.boxShadow = "0 0 10px #c45c5c";
    }
}

getPlayerCount();

setInterval(getPlayerCount, 30000);

