const { query } = require("../sql");
const fetch = require("node-fetch");
const getUser = async (req, res) => {
  //get the user from the riot api
  const name = req.params.name;
  const api_key = process.env.RIOT_API_KEY;
  const url = `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${api_key}`;
  const response = await fetch(url);
  const json = await response.json();
  const summoner = new Summoner({
    name: json.name,
    accountId: json.accountId,
    id: json.id,
    puuid: json.puuid,
    profileIconId: json.profileIconId,
    revisionDate: json.revisionDate,
    summonerLevel: json.summonerLevel,
  });
  //upload the user to the database
  console.log(summoner);
  const queryStr = `INSERT INTO summoners (name, accountId, id, puuid, profileIconId, revisionDate, summonerLevel) VALUES ('${summoner.name}', '${summoner.accountId}', '${summoner.id}', '${summoner.puuid}', '${summoner.profileIconId}', '${summoner.revisionDate}', '${summoner.summonerLevel}')`;
  const rows = await query(queryStr);
  res.send(rows);
  // const name = req.params.name;
  // console.log(query);
  // const rows = await query(`SELECT * FROM Summoners WHERE name = '${name}'`);
  // res.send(rows);
};
exports.getUser = getUser;

class Summoner {
  constructor({
    name,
    accountId,
    id,
    puuid,
    profileIconId,
    revisionDate,
    summonerLevel,
  }) {
    this.name = name;
    this.accountId = accountId;
    this.id = id;
    this.puuid = puuid;
    this.profileIconId = profileIconId;
    this.revisionDate = revisionDate;
    this.summonerLevel = summonerLevel;
  }
}
