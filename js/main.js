const serverCode = 'lyy7rv';

async function getPlayerCount() {
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

        document.getElementById("server-status").textContent = "ONLINE";
        document.getElementById("player-count").textContent =
            `${players} / ${maxPlayers} Players`;

    } catch (error) {
        document.getElementById("server-status").textContent = "OFFLINE";
        document.getElementById("player-count").textContent = "";
    }
}

getPlayerCount();

setInterval(getPlayerCount, 30000);
