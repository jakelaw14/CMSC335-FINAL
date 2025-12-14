const express = require("express");
const { BalldontlieAPI } = require("@balldontlie/sdk");
const Player = require("../models/Player");

const router = express.Router();

const api = new BalldontlieAPI({
    apiKey: "fcc030fc-a64a-468c-8858-cee01c32db69"
});

router.post("/", async (req, res) => {
    try {
        const id = req.body.playerId;

        const response = await api.nba.getPlayer(id);
        const p = response.data;

        const saved = new Player({
            idNumber: id,
            name: p.first_name + " " + p.last_name,
            position: p.position || "N/A",
            height: p.height || "N/A",
            weight: p.weight || "N/A",
            team: p.team?.full_name || "N/A"
        });

        await saved.save();

        res.redirect("/players");
    } catch (err) {
        console.error(err);
        res.send("Error fetching player. Try a valid ID.");
    }
});

router.get("/", async (req, res) => {
    const players = await Player.find();
    res.render("players", { players });
});

module.exports = router;
