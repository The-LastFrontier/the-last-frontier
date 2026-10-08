const PROXY_URL = "fivem-proxy.php"; // path to your proxy, e.g. "/api/players" if using Node

async function getPlayerCount() {
    const status = document.getElementById("server-status");
    const playerCount = document.getElementById("player-count");
    const statusDot = document.getElementById("status-dot");

    try {
        const response = await fetch(PROXY_URL, { cache: "no-store" });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        // Handles both the PHP proxy (passes dynamic.json through)
        // and the Node proxy ({ players, maxPlayers })
        if (data.error) throw new Error("offline");

        const players = data.clients ?? data.players ?? 0;
        const maxPlayers = data.sv_maxclients ?? data.maxPlayers ?? 0;

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
